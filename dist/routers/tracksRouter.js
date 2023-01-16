"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var TracksController_1 = __importDefault(require("../controllers/tracks/TracksController"));
var router = express_1.Router();
/**
 * @description 1. get all tracks
 * @endpoint http://localhost:2828/api/v1/tracks/all
 */
router.get("/all", TracksController_1.default.getAllTracks);
/**
 * @description 5. get all liked tracks
 * @endpoint http://localhost:2828/api/v1/tracks/liked
 */
router.get("/liked", TracksController_1.default.getLikedTracks);
/**
 * @description 6. shuffle list of tracks
 * @endpoint http://localhost:2828/api/v1/tracks/shuffle
 */
router.get("/shuffle", TracksController_1.default.shuffleTracks);
/**
 * @description 2. get specified track
 * @endpoint http://localhost:2828/api/v1/tracks/:id
 */
router.get("/:id", TracksController_1.default.getTrack);
/**
 * @description 3. save a track
 * @endpoint http://localhost:2828/api/v1/tracks/save
 * @example same
 */
router.post("/save", TracksController_1.default.addTrack);
/**
 * @description 4. delete specified track
 * @endpoint http://localhost:2828/api/v1/tracks/delete/:id
 */
router.delete("/delete/:id", TracksController_1.default.deleteTrack);
/**
 * @description 5. add a like to a track
 * @endpoint http://localhost:2828/api/v1/tracks/like/:id
 */
router.get("/like/:id", TracksController_1.default.likeTrack);
exports.default = router;
//# sourceMappingURL=tracksRouter.js.map