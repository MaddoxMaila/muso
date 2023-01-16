import { Router } from "express";
import SearchController from "../controllers/SearchController";

const router = Router()

/**
 * @description 1. search tracks and playlists
 * @endpoint http://localhost:2828/api/v1/search/
 */
router.get("/", SearchController.search)

export default router
