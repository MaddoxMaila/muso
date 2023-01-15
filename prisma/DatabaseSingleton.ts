import { PrismaClient } from "@prisma/client"


class DatabaseSingleton {
    static db: PrismaClient

    constructor(){
        /**
         * Never call this constructor directly in code, always call the static method "getDb"
         */
        DatabaseSingleton.db = new PrismaClient()
    }

    static getDb(): PrismaClient{
        /**
         * Main Singleton pattern logic.
         * 
         */
        if(!DatabaseSingleton.db)
             new DatabaseSingleton()
        return DatabaseSingleton.db
    }

}

export default DatabaseSingleton