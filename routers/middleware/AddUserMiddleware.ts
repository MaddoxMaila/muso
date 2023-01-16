import { PrismaClient } from '@prisma/client';
import { Request, NextFunction, Response } from 'express'
import ApiResponse from '../../libs/ApiResponse';
import DatabaseSingleton from '../../prisma/DatabaseSingleton';


const AddUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    /**
     * @description
     * Simulate how a user would be added in middleware based on their JWT,
     * this is just workaround since no jwt is in the request header.
     * I'll just retrieve that one user I created at application startup
     */
    try {
        
        const db: PrismaClient = DatabaseSingleton.getDb()

        const user  = await db.admin.findFirst()
        if(!user) throw new Error("Authorized user does not exist")

        //set user in request
        req.user = user
        
        next()
    } catch (e: any) {
        res.status(401).json(ApiResponse(true, e.message, e))
    }

}

export default AddUserMiddleware