import { Response, Request } from "express";
import { validationResult } from "express-validator";
import ApiResponse from "../../libs/ApiResponse";
import { isAllowedFile } from "../../libs/ResourceUploader";
import TracksSingleton from "../../libs/Track";
import ValidationError from "../../libs/ValidationError";
import DatabaseSingleton from "../../prisma/DatabaseSingleton";

const db = DatabaseSingleton.getDb()

const TracksController = {
    getTrack: async (request: Request, response: Response) => {
        /**
         * @description
         * Get track of the from the specified id
         */
        try{

            const { id }= request.params

            const errors = validationResult(request);
            if (!errors.isEmpty()) throw new ValidationError("failed validations", {errors: errors.array()})
            
            const track = await TracksSingleton
                                            .getInstance()
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
        /**
         * @description
         * Get all tracks that where added by specific user
         */
        try{
            
            const tracks = await TracksSingleton
                                              .getInstance()
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
        /**
         * @description
         * Add track including its artwork & audio files
         */
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

             if(!audio) throw new Error("Missing audio file")
             if(!artwork) throw new Error("Missing artwork file")

             // check for allow file extensions
             if(!isAllowedFile(audio)) throw new Error("Unsupported file type, make sure it is an Audio file")
             if(!isAllowedFile(artwork)) throw new Error("Unsupported file type, make sure it is an Image file")

             // check & catch any other validations
             const errors = validationResult(request);
             if (!errors.isEmpty()) throw new ValidationError("failed validations", {errors: errors.array()})

             if(!parseInt(duration) || !parseInt(year)) throw new Error("Supply valid numbers for track duration and year")

             const track = await TracksSingleton
                                              .getInstance()
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
        /**
         * @description
         * delete track of the specified id
         */
        try {
            
            const { id } = request.params

            const errors = validationResult(request);
            if (!errors.isEmpty()) throw new ValidationError("failed validations", {errors: errors.array()})

            const track = await TracksSingleton
                                       .getInstance()
                                       .deleteTrack(id)
                                       
            if(!track) throw new Error("failed to delete track")

            response.status(200).json(
                ApiResponse(false, "deleted track successfully", {track: track})
            )

        } catch (e: any) {
            response.status(500).json(
                ApiResponse(true, e.message, e)
            )
        }

    },
    likeTrack: async (request: Request, response: Response) => {
        /**
         * @description
         * Add a like to a track
         */
        try{

            const { id } = request.params

            const errors = validationResult(request);
            if (!errors.isEmpty()) throw new ValidationError("failed validations", {errors: errors.array()})

            const like = await TracksSingleton
                                     .getInstance()
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
        /**
         * @description
         * Get all tracks that are liked a user
         */
        try {

            const likedTracks = await TracksSingleton
                                                  .getInstance()
                                                  .getLikedTracks(request.user?.id)
            
            if(!likedTracks) throw new Error("Failed to compile liked tracks.")

            response.status(200).json(
                ApiResponse(false, likedTracks.length > 0 ? "Tracks you have liked" : "No liked tracks found", { tracks: likedTracks, user: request.user })
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