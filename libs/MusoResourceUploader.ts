import { randomUUID } from "crypto";
import fileUpload from "express-fileupload";

const newFileName = (fileName: string): string => {
    
    const name = fileName.split(".")
    const ext = name[name.length - 1]

    return `${randomUUID()}.${ext}`
}

let PATH: string = ""

export const saveArtwork = async (artworkFile: fileUpload.UploadedFile) => {

    artworkFile.name = newFileName(artworkFile.name)

    PATH = process.env.ARTWORK_PATH || './public/artwork'

    artworkFile.mv(`${PATH}/${artworkFile.name}`, error => {
        if(error) throw Error("failed to save artwork")
    })

    return `/public/artwork/${artworkFile.name}`

}

export const saveAudio = async (audioFile: fileUpload.UploadedFile) => {
    
    audioFile.name = newFileName(audioFile.name)

    PATH = process.env.AUDIO_PATH || './public/audios'
    
    audioFile.mv(`${PATH}/${audioFile.name}`, error => {
        if(error) throw Error("failed to save audio")
    })

    return `/public/artwork/${audioFile.name}`

}

 