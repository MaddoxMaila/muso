import { Router } from "express";
import SearchController from "../controllers/SearchController";
import { validate } from "./validations";

const router = Router()

/**
 * @description 1. search tracks and playlists
 * @endpoint http://localhost:2828/api/v1/search/
 */
router.get("/", validate("q","field does not exist"), SearchController.search)

export default router
