import fileUpload from "express-fileupload"

export type MusoFile = fileUpload.UploadedFile | fileUpload.UploadedFile[]  | undefined 

export type Track = {
    name        : string,
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
    track       : Track,
    playlist    : Playlist
}