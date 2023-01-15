import { Admin } from '@prisma/client';
import {Express, Request} from "express";

declare global{
    namespace Express {
        interface Request {
            user: Admin
        }
    }
}

declare namespace NodeJS {
    interface ProcessEnv {
        PORT?: string;
        DATABASE_URL: string;
        API_KEY: string;
        ARTWORK_PATH: string;
        AUDIO_PATH: string;
    }
}
