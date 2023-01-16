import { Router } from "express";
import AuthController from "../../controllers/auth/AuthController";
const router = Router()

/**
 * @description 1. create a new user then login user
 * @endpoint http://localhost:2727/api/v1/auth/signup
 */
router.post('/signup', AuthController.signUp)

/**
 * @description 2. login user
 * @endpoint http://localhost:2727/api/v1/auth/login
 */
router.post('/login', AuthController.login)



export default router