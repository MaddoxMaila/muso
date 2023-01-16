

class ValidationError extends Error {
    constructor(message: string, public data: Object){
        super(message)
    }
}


export default ValidationError