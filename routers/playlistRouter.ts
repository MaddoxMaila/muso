import { Router } from "express";
import PlaylistController from "../controllers/playlists/PlaylistController";

const router = Router()

/**
 * @description 1. create playlist
 * @endpoint http://localhost:2828/api/v1/playlist/new
 */
router.get("/new", PlaylistController.createPlaylist)

/**
 * @description 2. add a track to playlisr
 * @endpoint http://localhost:2828/api/v1/playlist/add-track
 */
router.get("/add-track", PlaylistController.addTrackToPlaylist)

/**
 * @description 3. delete a playlist
 * @endpoint http://localhost:2828/api/v1/playlist/delete/:id
 */
router.get("/delete/:id", PlaylistController.deletePlaylist)

/**
 * @description 4. delete track from playlist
 * @endpoint http://localhost:2828/api/v1/playlist/delete/track/:id
 */
router.get("/delete/track/:id", PlaylistController.deletePlaylistTrack)


export default router
