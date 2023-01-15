import { Response, Request } from "express";
import ApiResponse from "../../libs/ApiResponse";
import MusoSingleton from "../../libs/Muso";
import DatabaseSingleton from "../../prisma/DatabaseSingleton";

const db = DatabaseSingleton.getDb()

const TracksController = {
    getTrack: async (request: Request, response: Response) => {
        try{

            /**
             * Validation is done on the route definition
             */
            const { id } = request.params
            
            const track = await MusoSingleton
                                            .getMuso()
                                            .getTrack(id)

            if(!track) throw new Error("could not find the specified song.")

            response.status(200).json(
                ApiResponse(false, "song found!", {track: track})
            )

        }catch(e: any){
            response.status(500).json(
                ApiResponse(true, e.message, e)
            )
        }
    },
    getAllTracks: async (request: Request, response: Response) => {

        try{

            const tracks = await MusoSingleton
                                              .getMuso()
                                              .getAllTracks(request.user?.id)

            if(!tracks) throw new Error("failed to retrieve all tracks")

            response.status(200).json(
                ApiResponse(true, tracks.length > 0 ? "songs found" : "could not find any songs, please add songs!.", {tracks: tracks})
            )

        }catch(e: any){
            response.status(500).json(
                ApiResponse(true, e.message, e)
            )
        }

    },
    addTrack: async (request: Request, response: Response) => {

        try{

            const { 
                name,
                album,
                artist,
                duration,
                year
             } = request.body

             const audio  = request.files?.audio
             const artwork = request.files?.artwork

             const track = await MusoSingleton
                                              .getMuso()
                                              .addTrack({name, album, artist, duration: parseInt(duration), year: parseInt(year), audio, artwork, userId: request.user?.id})

             if(!track) throw new Error("failed to add track")

            response.status(200).json(
                ApiResponse(false, "saved track successfully", {track: track})
            )

        }catch(e: any){
            response.status(500).json(
                ApiResponse(true, e.message, e)
            )
        }   
    },
    deleteTrack: async (request: Request, response: Response) => {

        try {
            
            const { id } = request.params

            const track = MusoSingleton
                                       .getMuso()
                                       .deleteTrack(id)

            if(!track) throw new Error("failed to delete track")

            response.status(200).json(
                ApiResponse(false, "saved track successfully", {track: track})
            )

        } catch (e: any) {
            response.status(500).json(
                ApiResponse(true, e.message, e)
            )
        }

    },
    likeTrack: async (request: Request, response: Response) => {

        try{

            const { id } = request.params

            const like = await MusoSingleton
                                     .getMuso()
                                     .likeOrUnlikeTrack({trackId: id, userId: request.user?.id})

            if(!like) throw new Error("Failed to like track")

            response.status(200).json(
                ApiResponse(false, `${like.liked ? 'Liked' : 'Unliked'} track`, {track: like})
            )

        }catch(e: any){
            response.status(500).json(
                ApiResponse(true, e.message, e)
            )
        }
    },
    getLikedTracks: async (request: Request, response: Response) => {
        
        try {

            // if(!request.user) throw new Error("Auth")

            const likedTracks = await MusoSingleton
                                                  .getMuso()
                                                  .getLikedTracks(request.user?.id)
            
            if(!likedTracks) throw new Error("Failed to compile liked tracks.")

            response.status(200).json(
                ApiResponse(false, likedTracks.length > 0 ? "Tracks you have liked" : "No liked tracks found", { tracks: likedTracks, user: request.user?.id })
            )

        } catch (e: any) {
            response.status(500).json(
                ApiResponse(true, e.message, e)
            )
        }
    },
    shuffleTracks: async (request: Request, response: Response) => {

    }
}

export default TracksController