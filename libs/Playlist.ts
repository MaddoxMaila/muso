import { PrismaClientValidationError } from '@prisma/client/runtime';
import { PrismaClient } from '@prisma/client';
import DatabaseSingleton from '../prisma/DatabaseSingleton';
import TracksSingleton from './Track';
import { LikedTrack } from './types';


class Playlist {

    private db: PrismaClient

    constructor(){ this.db = DatabaseSingleton.getDb() }

    async createPlaylist(playlist: {name: string, userId: string}){
        /**
         * @description
         * Create a playlist
         * @param
         *      playlist: {name: string, userId: string} - name of the playlist, user id of the user creating the playlist
         */
        try {

            return await this.db.playlist.create({
                data: playlist
            })
            
        } catch (e: any) {
            if(e instanceof PrismaClientValidationError) return null
        }

    }

    async addTrackToPlaylist(playlistTrack: {playlistId: string, trackId: string}){
        /**
         * @description
         * Add a track to playlist
         * @param
         *      playlistTrack: {playlistId: string, trackId: string} - playlist id of to add the track in, track id of the track being added
         */
        try{

            return await this.db.playlistTracks.create({
                data: playlistTrack
            })

        }catch(e: any){
            if(e instanceof PrismaClientValidationError) return null
        }

    }

    async deletePlaylist(playlistId: string){
        /**
         * @description
         * Delete playlist
         * @param
         *       playlistId: string - playlist id of the playlist to be deleted    
         */
        try{

            return await this.db.playlist.delete({
                where: {id: playlistId}
            })

        }catch(e: any){
            if(e instanceof PrismaClientValidationError) return null
        }
    }

    async getPlaylists(userId: string){
        /**
         * @description
         * Get all playlists created by user
         * @param
         *      userId: string - user id of the user who the playlists belong to
         */
        try {
            
            return await this.db.playlist.findMany({
                where: {userId: userId}
            })

        } catch (e: any) {
            if(e instanceof PrismaClientValidationError) return null
        }

    }

    async getPlaylistTracks(ids: {playlistId: string, userId: string}){
        /**
         * @description
         * Get a playlist and all of it's songs
         * @param
         *      ids: {playlistId: string, userId: string} - playlist id of the playlist to get tracks of, user id to only get tracks that were by the user in the playlist
         */
        try {
            
            const playlist = await this.db.playlist.findFirst({
                where: {id: ids.playlistId, userId: ids.userId},
                include: {playlistTracks: true}
            })

            if(playlist === null) return []

            const playlistWithTracks: {name: string, 
                                       id: string,
                                       created_at: Date, 
                                       playlistTracks: LikedTrack[]} = {name: playlist.name, id: playlist.id, created_at: playlist.created_at, playlistTracks: []}

            
            for(let ptrack of playlist.playlistTracks){

                const t = await this.db.track.findFirst({where: {id: ptrack.trackId}, include: {likedTracks: true}})
                if(!t) return

                playlistWithTracks.playlistTracks.push(TracksSingleton.getInstance().addLikedFieldToTrack(t))

            }

            return playlistWithTracks

        } catch (e: any) {
            if(e instanceof PrismaClientValidationError) return null
        }

    }

    async deletePlaylistTrack(ids: {playlistId: string, trackId: string}){

        try {

            // To Implement!

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