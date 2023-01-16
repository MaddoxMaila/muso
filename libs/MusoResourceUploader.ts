import { randomUUID } from "crypto";
import fileUpload from "express-fileupload";

const newFileName = (fileName: string): string => {
    
    const name = fileName.split(".")
    const ext = name[name.length - 1]

    return `${randomUUID()}.${ext}`
}

let PATH: string = ""

export const saveArtwork = async (artworkFile: fileUpload.UploadedFile) => {
    /**
     * @description
     * Move artwork file and then create a url for the file in the server
     * @param
     *      artworkFile: UploadedFile - file to be moved in the server
     */
    artworkFile.name = newFileName(artworkFile.name)

    PATH = process.env.ARTWORK_PATH || './public/artwork'

    artworkFile.mv(`${PATH}/${artworkFile.name}`, error => {
        if(error) throw Error("failed to save artwork")
    })

    return `/public/artwork/${artworkFile.name}`

}

export const saveAudio = async (audioFile: fileUpload.UploadedFile) => {
    /**
     * @description
     * Move audio file and then create a url for the file in the server
     * @param
     *      audioFile: UploadedFile - file to be moved in the server
     */
    audioFile.name = newFileName(audioFile.name)

    PATH = process.env.AUDIO_PATH || './public/audios'
    
    audioFile.mv(`${PATH}/${audioFile.name}`, error => {
        if(error) throw Error("failed to save audio")
    })

    return `/public/artwork/${audioFile.name}`

}

 