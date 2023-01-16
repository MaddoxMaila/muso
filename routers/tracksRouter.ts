import { EMPTY_FIELD, validate } from './validations';
import { Router } from "express";
import TracksController from "../controllers/tracks/TracksController";
import { check, ValidationChain } from "express-validator";

const router = Router()

/**
 * @description 1. get all tracks
 * @endpoint http://localhost:2828/api/v1/tracks/all
 */
router.get("/all", TracksController.getAllTracks)

/**
 * @description 5. get all liked tracks
 * @endpoint http://localhost:2828/api/v1/tracks/liked
 */
router.get("/liked", TracksController.getLikedTracks)

/**
 * @description 6. shuffle list of tracks
 * @endpoint http://localhost:2828/api/v1/tracks/shuffle
 */
router.get("/shuffle", TracksController.shuffleTracks)

/**
 * @description 2. get specified track
 * @endpoint http://localhost:2828/api/v1/tracks/:id
 */
router.get("/:id", validate("id", "supply track id to retrieve it"), TracksController.getTrack)

/**
 * @description 3. save a track
 * @endpoint http://localhost:2828/api/v1/tracks/save
 * @example same
 */
router.post("/save",
            validate("name","supply name of track"),
            validate("album","supply name of album"),
            validate("artist", "supply name of artist"),
            check("duration").exists().withMessage("supply track duration in seconds").notEmpty().withMessage(EMPTY_FIELD).toInt().withMessage("Supply a number"),
            check("year").exists().withMessage("supply track year").notEmpty().withMessage(EMPTY_FIELD).toInt().withMessage("Supply a number"),
            TracksController.addTrack
 )

/**
 * @description 4. delete specified track
 * @endpoint http://localhost:2828/api/v1/tracks/delete/:id
 */
router.delete("/delete/:id", validate("id", "supply track id to delete"), TracksController.deleteTrack
)

/**
 * @description 5. add a like to a track
 * @endpoint http://localhost:2828/api/v1/tracks/like/:id
 */
router.get("/like/:id", validate("id", "supply track id to like"), TracksController.likeTrack)

export default router