import { LikedTracks, Track } from "@prisma/client"
import fileUpload from "express-fileupload"

export type MusoFile = fileUpload.UploadedFile | fileUpload.UploadedFile[]  | undefined 

export type TrackType = {
    userId      : string
    name        : string
    album       : string
    artist      : string
    duration    : number
    year        : number
    audio       : MusoFile
    artwork     : MusoFile
}

export type Playlist = {
    creator     : string
    name        : string
    playtime    : number
}

export type PlaylistTrack = {
    track       : TrackType,
    playlist    : Playlist
}

export type LikedTrack = {
    userId      : string
    name        : string
    album       : string
    artist      : string
    duration    : number
    year        : number
    artwork     : string
    audio       : string
    likedTracks : boolean
}

export interface TrackWithLikedTrack extends Track {
    likedTracks: LikedTracks[]
}