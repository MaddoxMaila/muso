import { Router } from "express";
import AuthController from "../controllers/auth/AuthController";
const router = Router()

/**
 * @description 1. create a new user then login user
 * @param { email:String, name:String, password:String } = req.body
 * @endpoint http://localhost:2727/auth/signup
 * @example same
 */
router.post('/signup', AuthController.signUp)

/**
 * @description 2. login user
 * @param { email:String, password:String } = req.body
 * @endpoint http://localhost:2727/auth/login
 * @example same
 */
router.post('/login', AuthController.login)



export default router