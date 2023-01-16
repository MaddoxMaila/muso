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
 * @endpoint http://localhost:2828/api/v1/playlist/new
 */
router.get("/new", PlaylistController_1.default.createPlaylist);
/**
 * @description 2. add a track to playlisr
 * @endpoint http://localhost:2828/api/v1/playlist/add-track
 */
router.get("/add-track", PlaylistController_1.default.addTrackToPlaylist);
/**
 * @description 3. delete a playlist
 * @endpoint http://localhost:2828/api/v1/playlist/delete/:id
 */
router.get("/delete/:id", PlaylistController_1.default.deletePlaylist);
/**
 * @description 4. delete track from playlist
 * @endpoint http://localhost:2828/api/v1/playlist/delete/track/:id
 */
router.get("/delete/track/:id", PlaylistController_1.default.deletePlaylistTrack);
exports.default = router;
//# sourceMappingURL=playlistRouter.js.map