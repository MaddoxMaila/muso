export default function ApiResponse<T>(error: boolean, message: string, response: T) {
    if(response instanceof Error){
        console.log(response)
    }
    return {
        error, message, ...response
    }
}