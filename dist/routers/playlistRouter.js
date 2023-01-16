"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var PlaylistController_1 = __importDefault(require("../controllers/playlists/PlaylistController"));
var router = express_1.Router();
/**
 * @description 1. create playlist
 * @endpoint http://localhost:2828/api/v1/playlists/new
 */
router.post("/new", PlaylistController_1.default.createPlaylist);
/**
 * @description 2. add a track to playlisr
 * @endpoint http://localhost:2828/api/v1/playlists/add-track
 */
router.post("/add-track", PlaylistController_1.default.addTrackToPlaylist);
/**
 * @description 3. delete a playlist
 * @endpoint http://localhost:2828/api/v1/playlists/delete/:id
 */
router.delete("/delete/:id", PlaylistController_1.default.deletePlaylist);
/**
 * @description 4. Get Playlists
 * @endpoint http://localhost:2828/api/v1/playlists/all
 */
router.get("/all", PlaylistController_1.default.getPlaylists);
/**
 * @description 5. Get playlist and all its tracks
 * @endpoint http://localhost:2828/api/v1/playlists/:id
 */
router.get("/:id", PlaylistController_1.default.getPlaylistTracks);
/**
 * @description 4. delete track from playlist
 * @endpoint http://localhost:2828/api/v1/playlist/delete/track/:id
 */
router.delete("/delete/track/:id", PlaylistController_1.default.deletePlaylistTrack);
exports.default = router;
//# sourceMappingURL=playlistRouter.js.map