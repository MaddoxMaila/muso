"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = __importDefault(require("../controllers/auth/AuthController"));
var router = express_1.Router();
/**
 * @description 1. create a new user then login user
 * @param { email:String, name:String, password:String } = req.body
 * @endpoint http://localhost:2727/auth/signup
 * @example same
 */
router.post('/signup', AuthController_1.default.signUp);
/**
 * @description 2. login user
 * @param { email:String, password:String } = req.body
 * @endpoint http://localhost:2727/auth/login
 * @example same
 */
router.post('/login', AuthController_1.default.login);
exports.default = router;
//# sourceMappingURL=authRouter.js.map