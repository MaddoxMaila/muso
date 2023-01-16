

class MusoError extends Error {
    constructor(message: string, public data: Object){
        super(message)
    }
}


export default MusoError