import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieparser from 'cookie-parser'
import helmet from 'helmet'
import fileUpload from 'express-fileupload'

import ErrorMid from './routers/middleware/ErrorMid';

//import routes
import Routers from './routers/index';
import createUser from './createDummyUser';

import ApiKeyMiddleware from './routers/middleware/ApiKeyMiddleware';


//init
dotenv.config()

const app = express()

// configurations
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieparser());
app.use(helmet());
app.use(fileUpload())
app.use(express.static(`${__dirname}/public/artwork`))
app.use(express.static(`${__dirname}/public/audios`))
//enable cros 
app.use(cors({ origin: true, credentials: true }))


const BASE_URL: string = "/api/v1"
//routers
app.get(`${BASE_URL}`, (_, res) => res.send("Running... 🚀"))

/**
 * Define routes to express so that they can accessible
 * Also added API key middleware here in the top level of which the inclusion will trickle down to each sub-route
 */
app.use(`${BASE_URL}/auth`, ApiKeyMiddleware, Routers.authRouter)
app.use(`${BASE_URL}/tracks`, ApiKeyMiddleware, Routers.tracksRouter)
// app.use("/playlists", Routers.playlistRouter)

//catch all error
app.use(ErrorMid);

// createUser({
//     name: "Tshepang",
//     email: "tshepang.maila@ayoba.com",
//     password: "my-password"
// })


const port = process.env.PORT || 2828;
app.listen(port, () => console.log(`Server Running on PORT ${port}`))