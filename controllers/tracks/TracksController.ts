import { Response, Request } from "express";
import fileUpload from "express-fileupload";
import ApiResponse from "../../libs/ApiResponse";
import MusoSingleton from "../../libs/Muso";

const muso = MusoSingleton.getMuso()

const TracksController = {
    getTrack: async (request: Request, response: Response) => {
        try{

            /**
             * Validation is done on the route definition
             */
            const { id } = request.params
            
            const track = await muso.getTrack(id)

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

            const tracks = await muso.getAllTracks()

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

             const track = await muso.addTrack({name, album, artist, duration, year, audio, artwork})

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

            const track = muso.deleteTrack(id)

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
    shuffleTracks: async (request: Request, response: Response) => {

    }
}

export default TracksController