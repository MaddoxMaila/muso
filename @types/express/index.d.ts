import { Admin } from '@prisma/client';
declare namespace Express {
    export interface Request {
        user?: Admin
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
