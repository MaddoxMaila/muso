import { PrismaClientValidationError } from '@prisma/client/runtime';
import { PrismaClient, Prisma } from '@prisma/client';
import DatabaseSingleton from '../prisma/DatabaseSingleton';


class Playlist {

    private db: PrismaClient

    constructor(){ this.db = DatabaseSingleton.getDb() }

    async createPlaylist(playlist: {name: string, userId: string}){

        try {

            return await this.db.playlist.create({
                data: playlist
            })
            
        } catch (e: any) {
            if(e instanceof PrismaClientValidationError) return null
        }

    }

    async addTrackToPlaylist(playlistTrack: {playlistId: string, trackId: string}){

        try{

            return await this.db.playlistTracks.create({
                data: playlistTrack
            })

        }catch(e: any){
            if(e instanceof PrismaClientValidationError) return null
        }

    }

    async deletePlaylist(id: string){

        try{

            return await this.db.playlist.delete({
                where: {id: id}
            })

        }catch(e: any){
            if(e instanceof PrismaClientValidationError) return null
        }
    }

    async deletePlaylistTrack(id: string){

        try {

            

        } catch (e: any) {
            if(e instanceof PrismaClientValidationError) return null
        }
    }

}

class PlaylistSingleton {

    static playlist: Playlist

    constructor(){
        PlaylistSingleton.playlist = new Playlist()
    }

    static playlistInstance(){
        if(!PlaylistSingleton.playlist)
            new PlaylistSingleton()
        return PlaylistSingleton.playlist
    }
}

export default PlaylistSingleton