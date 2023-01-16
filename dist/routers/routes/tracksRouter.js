"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var validations_1 = require("../validations");
var express_1 = require("express");
var TracksController_1 = __importDefault(require("../../controllers/tracks/TracksController"));
var express_validator_1 = require("express-validator");
var router = express_1.Router();
/**
 * @description 1. get all tracks
 * @endpoint http://localhost:2828/api/v1/tracks/all
 */
router.get("/all", TracksController_1["default"].getAllTracks);
/**
 * @description 5. get all liked tracks
 * @endpoint http://localhost:2828/api/v1/tracks/liked
 */
router.get("/liked", TracksController_1["default"].getLikedTracks);
/**
 * @description 6. shuffle list of tracks
 * @endpoint http://localhost:2828/api/v1/tracks/shuffle
 */
router.get("/shuffle", TracksController_1["default"].shuffleTracks);
/**
 * @description 2. get specified track
 * @endpoint http://localhost:2828/api/v1/tracks/:id
 */
router.get("/:id", validations_1.validate("id", "supply track id to retrieve it"), TracksController_1["default"].getTrack);
/**
 * @description 3. save a track
 * @endpoint http://localhost:2828/api/v1/tracks/save
 * @example same
 */
router.post("/save", validations_1.validate("name", "supply name of track"), validations_1.validate("album", "supply name of album"), validations_1.validate("artist", "supply name of artist"), express_validator_1.check("duration").exists().withMessage("supply track duration in seconds").notEmpty().withMessage(validations_1.EMPTY_FIELD).toInt().withMessage("Supply a number"), express_validator_1.check("year").exists().withMessage("supply track year").notEmpty().withMessage(validations_1.EMPTY_FIELD).toInt().withMessage("Supply a number"), TracksController_1["default"].addTrack);
/**
 * @description 4. delete specified track
 * @endpoint http://localhost:2828/api/v1/tracks/delete/:id
 */
router["delete"]("/delete/:id", validations_1.validate("id", "supply track id to delete"), TracksController_1["default"].deleteTrack);
/**
 * @description 5. add a like to a track
 * @endpoint http://localhost:2828/api/v1/tracks/like/:id
 */
router.get("/like/:id", validations_1.validate("id", "supply track id to like"), TracksController_1["default"].likeTrack);
exports["default"] = router;
//# sourceMappingURL=tracksRouter.js.map