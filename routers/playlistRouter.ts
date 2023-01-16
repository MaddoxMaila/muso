import { Router } from "express";
import PlaylistController from "../controllers/playlists/PlaylistController";

const router = Router()

/**
 * @description 1. create playlist
 * @endpoint http://localhost:2828/api/v1/playlists/new
 */
router.post("/new", PlaylistController.createPlaylist)

/**
 * @description 2. add a track to playlisr
 * @endpoint http://localhost:2828/api/v1/playlists/add-track
 */
router.post("/add-track", PlaylistController.addTrackToPlaylist)

/**
 * @description 3. delete a playlist
 * @endpoint http://localhost:2828/api/v1/playlists/delete/:id
 */
router.delete("/delete/:id", PlaylistController.deletePlaylist)

/**
 * @description 4. Get Playlists
 * @endpoint http://localhost:2828/api/v1/playlists/all
 */
router.get("/all", PlaylistController.getPlaylists)

/**
 * @description 5. Get playlist and all its tracks
 * @endpoint http://localhost:2828/api/v1/playlists/:id
 */
router.get("/:id", PlaylistController.getPlaylistTracks)

/**
 * @description 4. delete track from playlist
 * @endpoint http://localhost:2828/api/v1/playlist/delete/track/:id
 */
router.delete("/delete/track/:id", PlaylistController.deletePlaylistTrack)


export default router
