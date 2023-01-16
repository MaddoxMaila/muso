import { PrismaClient } from '@prisma/client';
import { Request, NextFunction, Response } from 'express'
import ApiResponse from '../../libs/ApiResponse';
import DatabaseSingleton from '../../prisma/DatabaseSingleton';


const AddUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    try {
        
        const db: PrismaClient = DatabaseSingleton.getDb()

        // Since a user wasn't neccessarily needed, this will simulate a user
        // I'll just retrieve that one user I create at application startup
        const user  = await db.admin.findFirst()
        if(!user?.id) throw new Error("Authorized user does not exist")

        //set user in request
        req.user = user
        
        next()
    } catch (e: any) {
        res.status(401).json(ApiResponse(true, e.message, e))
    }

}

export default AddUserMiddleware