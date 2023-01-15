import { saveArtwork, saveAudio } from './MusoResourceUploader';
import { PrismaClient } from '@prisma/client';
import DatabaseSingleton from "../prisma/DatabaseSingleton"
import { Track } from './types'
import { PrismaClientValidationError } from '@prisma/client/runtime';


class Muso {

    private db: PrismaClient

    constructor(){ this.db = DatabaseSingleton.getDb() }
    
    async getAllTracks(){
        /**
         * Get All tracks, if there are no tracks an empty array will be returned
         */
        return await this.db.track.findMany()
    }

    async getTrack(id: string){
        /**
         * Get a track based on the UUID of that track
         */
        return await this.db.track.findUnique({
            where: {
                id: id
            }
        })
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
            
            if(e instanceof PrismaClientValidationError){
                return null
            }

        }
    }

    async deleteTrack(id: string){
        /**
         * Delete track
         */

        return await this.db.track.delete({
            where: {
                id: id
            }
        })
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