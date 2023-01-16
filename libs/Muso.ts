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
         * Get All tracks, if there are no tracks an empty array will be returned
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

    async getTrack(id: string){
        /**
         * Get a track based on the UUID of that track
         */
        try {

            return await this.db.track.findUnique({
                where: {
                    id: id
                }
            })
            
        } catch (e: any) {
            if(e instanceof PrismaClientValidationError) return null
        }
    }

    async addTrack(track: Track){
        /**
         * Add track to database and save
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

    async deleteTrack(id: string){
        /**
         * Delete track
         */

        try {
            
            return await this.db.track.delete({
                where: {
                    id: id
                }
            })

        } catch (e: any) {
            if(e instanceof PrismaClientValidationError) return null
        }
    }

    async likeOrUnlikeTrack(like: {trackId: string, userId: string}){
        try {

            let likeTrack: LikedTracks | null = null
            let liked: boolean = false

            if(
                await this.db.likedTracks.count({where: {id: like.trackId}}) === 0
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

class MusoSingleton {
    
    static muso: Muso

    constructor(){
        MusoSingleton.muso = new Muso()
    }

    static getMuso(){
        if(!MusoSingleton.muso)
            new MusoSingleton()
        return MusoSingleton.muso
    }

}

export default MusoSingleton