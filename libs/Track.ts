import { saveArtwork, saveAudio } from './MusoResourceUploader';
import { LikedTracks, PrismaClient } from '@prisma/client';
import DatabaseSingleton from "../prisma/DatabaseSingleton"
import { Track } from './types'
import { PrismaClientValidationError } from '@prisma/client/runtime';


class Muso {

    private db: PrismaClient

    constructor(){ this.db = DatabaseSingleton.getDb() }
    
    async getAllTracks(userId: string){
        /**
         * @description
         * Get All tracks, if there are no tracks an empty array will be returned
         * @param
         *      userId: string - user id to specifically retrieve tracks added by specific users
         */
        try {

            return await this.db.track.findMany({
                where: {userId: userId},
                include: {likedTracks: true},
            })

        } catch (e: any) {
            if(e instanceof PrismaClientValidationError) return null
        }

    }

    async getTrack(trackId: string){
        /**
         * @description
         * Get a track based on the track id of that track
         * @param
         *      trackId: string - track id to identify which track to get
         */
        try {

            return await this.db.track.findUnique({
                where: {
                    id: trackId
                }
            })
            
        } catch (e: any) {
            if(e instanceof PrismaClientValidationError) return null
        }
    }

    async addTrack(track: Track){
        /**
         * @description
         * Add track to database and save. 
         * Process uploaded audio & artwork files
         * @param
         *      track: Track - data of the track that should be added
         */
        try {

            if(
                (typeof track.artwork !== "object" || Array.isArray(track.artwork))
                ||
                (typeof track.audio !== "object" || Array.isArray(track.audio))
            ) throw Error("Please upload a valid file!")
    
            const artwork_url: string = await saveArtwork(track.artwork)
            const audio_url: string = await saveAudio(track.audio)
    
            return await this.db.track.create({
                data: {
                    ...track,
                    audio:  audio_url,
                    artwork: artwork_url
                }
            })
            
        } catch (e: any) {
            if(e instanceof PrismaClientValidationError) return null

        }
    }

    async deleteTrack(trackId: string){
        /**
         * @description
         * Delete track using the track id
         * @param
         *      trackId: string - id of the track that should be deleted
         */
        try {
            
            return await this.db.track.delete({
                where: {
                    id: trackId
                }
            })

        } catch (e: any) {
            if(e instanceof PrismaClientValidationError) return null
        }
    }

    async likeOrUnlikeTrack(like: {trackId: string, userId: string}){
        /**
         * @description
         * Adding/ Removing a like from a track.
         * Check if user hasn't liked, Add like else remove like.
         * @param
         *      like: {trackId: string, userId: string} - track id of the track being liked and user id of the user liking the track
         */
        try {

            let likeTrack: LikedTracks | null = null
            let liked: boolean = false

            // Check for like
            if(
                await this.db.likedTracks.count({where: {trackUserId: `${like.trackId}-${like.userId}`}}) === 0
            ){

                // Like the track
                likeTrack = await this.db.likedTracks.create({
                    data: {...like, trackUserId: `${like.trackId}-${like.userId}`}
                })
                liked = true

            }else{

                // Unlike the track
                likeTrack = await this.db.likedTracks.delete({
                    where: {trackUserId: `${like.trackId}-${like.userId}`}
                })
                liked = false

            }

            return {liked, likeTrack}
            
        } catch (e: any) {
            if(e instanceof PrismaClientValidationError) return null
        }
    }

    async getLikedTracks(userId: string){
        /**
         * @description
         * retrieve only songs that where liked
         * @param
         *      userId: string - user id used to get users liked tracks
         */
        try{

            return await this.db.likedTracks.findMany({
                where: { userId: userId },
                include: { Track: true }
            })

        }catch(e: any){
            if(e instanceof PrismaClientValidationError) return null
        }
    }
}

class TracksSingleton {
    
    static muso: Muso

    constructor(){
        TracksSingleton.muso = new Muso()
    }

    static getInstance(){
        if(!TracksSingleton.muso)
            new TracksSingleton()
        return TracksSingleton.muso
    }

}

export default TracksSingleton