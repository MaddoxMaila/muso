import { Router } from "express";
import PlaylistController from "../../controllers/playlists/PlaylistController";
import { validate } from "../validations";

const router = Router()

/**
 * @description 1. create playlist
 * @endpoint http://localhost:2828/api/v1/playlists/new
 */
router.post("/new",
            validate("name", "missing name field"),
            PlaylistController.createPlaylist)

/**
 * @description 2. add a track to playlisr
 * @endpoint http://localhost:2828/api/v1/playlists/add-track
 */
router.post("/add-track", 
            validate("playlistId", "supply playlist id"),
            validate("trackId", "supply track id"),
            PlaylistController.addTrackToPlaylist)

/**
 * @description 3. delete a playlist
 * @endpoint http://localhost:2828/api/v1/playlists/delete/:id
 */
router.delete("/delete/:id", validate("id", "supply playlist id to delete"), PlaylistController.deletePlaylist)

/**
 * @description 4. Get Playlists
 * @endpoint http://localhost:2828/api/v1/playlists/all
 */
router.get("/all", PlaylistController.getPlaylists)

/**
 * @description 5. Get playlist and all its tracks
 * @endpoint http://localhost:2828/api/v1/playlists/:id
 */
router.get("/:id", validate("id", "supply playlist id to rerieve all its tracks"), PlaylistController.getPlaylistTracks)

/**
 * @description 4. delete track from playlist
 * @endpoint http://localhost:2828/api/v1/playlist/delete/track/:id
 */
// router.delete("/delete/track/:id", validate("id", "supply track id to delete"), PlaylistController.deletePlaylistTrack)


export default router
