import { PrismaClient } from "@prisma/client"


class DatabaseSingleton {
    static db: PrismaClient

    constructor(){
        
        // Never call this constructor directly in code, always call the static method "getDb"
        try {
            DatabaseSingleton.db = new PrismaClient()
        } catch (e: any) {
            console.log(e)
        }
    }

    static getDb(): PrismaClient{
        
         // Main Singleton pattern logic.
        if(!DatabaseSingleton.db)
             new DatabaseSingleton()
        return DatabaseSingleton.db
    }

}

export default DatabaseSingleton