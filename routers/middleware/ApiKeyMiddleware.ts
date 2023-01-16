import { Request, NextFunction, Response } from 'express'
import ApiResponse from '../../libs/ApiResponse'
import Helper from '../../utils/Helper'

const ApiKeyMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    /**
     * @description
     * Middleware to Verify and make sure that all incoming requests have an API Key present.
     */
    try {

        const headers = req.headers
        // check for access-key in header
        if(!headers['x-api-key']) throw new Error("Missing Access Key")

        const apiKey = headers['x-api-key'].toString()

        // verify api key
        const api: boolean = Helper.verifyApiKey(apiKey)

        if(!api) throw new Error("Invalid Access key")

        next()
    }catch(e: any){
        res.status(401).json(ApiResponse<Error>(true, e.message, e))
    }

}

export default ApiKeyMiddleware