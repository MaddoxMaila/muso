import { Request, Response } from "express";
import ApiResponse from "../libs/ApiResponse";
import DatabaseSingleton from "../prisma/DatabaseSingleton";

const db = DatabaseSingleton.getDb()

const SearchController = {
    search: async (request: Request, response: Response) => {

        /**
         * @description
         * Implementation of search, searches both tracks and playlists on a multi-field level.
         * Uses SQL LIKE keyword to catch any occuranceof the search word in both tables
         */
        
        try{

            const {q} = request.query
            const searchQuery = `%${q}%`

            const tracksSearch = await db.$queryRaw`SELECT * FROM track WHERE  album LIKE ${searchQuery}`
            const playlistsSeach = await db.$queryRaw`SELECT * from playlist WHERE name LIKE ${searchQuery}`

            response.status(200).json(
                ApiResponse(false, "search results", {tracks: tracksSearch, playlist: playlistsSeach})
            )

        }catch(e: any){
            response.status(500).json(
                ApiResponse(true, e.message, e)
            )
        }
    }
}

export default SearchController