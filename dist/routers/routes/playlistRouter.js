"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var PlaylistController_1 = __importDefault(require("../../controllers/playlists/PlaylistController"));
var validations_1 = require("../validations");
var router = express_1.Router();
/**
 * @description 1. create playlist
 * @endpoint http://localhost:2828/api/v1/playlists/new
 */
router.post("/new", validations_1.validate("name", "missing name field"), PlaylistController_1["default"].createPlaylist);
/**
 * @description 2. add a track to playlisr
 * @endpoint http://localhost:2828/api/v1/playlists/add-track
 */
router.post("/add-track", validations_1.validate("playlistId", "supply playlist id"), validations_1.validate("trackId", "supply track id"), PlaylistController_1["default"].addTrackToPlaylist);
/**
 * @description 3. delete a playlist
 * @endpoint http://localhost:2828/api/v1/playlists/delete/:id
 */
router["delete"]("/delete/:id", validations_1.validate("id", "supply playlist id to delete"), PlaylistController_1["default"].deletePlaylist);
/**
 * @description 4. Get Playlists
 * @endpoint http://localhost:2828/api/v1/playlists/all
 */
router.get("/all", PlaylistController_1["default"].getPlaylists);
/**
 * @description 5. Get playlist and all its tracks
 * @endpoint http://localhost:2828/api/v1/playlists/:id
 */
router.get("/:id", validations_1.validate("id", "supply playlist id to rerieve all its tracks"), PlaylistController_1["default"].getPlaylistTracks);
/**
 * @description 4. delete track from playlist
 * @endpoint http://localhost:2828/api/v1/playlist/delete/track/:id
 */
// router.delete("/delete/track/:id", validate("id", "supply track id to delete"), PlaylistController.deletePlaylistTrack)
exports["default"] = router;
//# sourceMappingURL=playlistRouter.js.map