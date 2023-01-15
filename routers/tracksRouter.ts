import { Router } from "express";
import AuthController from "../controllers/auth/AuthController";
import TracksController from "../controllers/tracks/TracksController";
const router = Router()

/**
 * @description 1. get all tracks
 * @endpoint http://localhost:2828/tracks/all
 */
router.get("/all", TracksController.getAllTracks)

/**
 * @description 2. get specified track
 * @endpoint http://localhost:2828/api/v1/tracks/:id
 */
router.get("/:id", TracksController.getTrack)

/**
 * @description 3. save a track
 * @endpoint http://localhost:2828/api/v1/tracks/save
 * @example same
 */
router.post("/save", TracksController.addTrack)

/**
 * @description 4. delete specified track
 * @endpoint http://localhost:2828/api/v1/tracks/delete/:id
 */
router.delete("/delete/:id", TracksController.deleteTrack)

/**
 * @description 5. shuffle list of songs
 * @endpoint http://localhost:2828/api/v1/tracks/shuffle
 */
router.get("/shuffle", TracksController.shuffleTracks)

export default router