"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var SearchController_1 = __importDefault(require("../controllers/SearchController"));
var router = express_1.Router();
/**
 * @description 1. search tracks and playlists
 * @endpoint http://localhost:2828/api/v1/search/
 */
router.get("/", SearchController_1.default.search);
exports.default = router;
//# sourceMappingURL=searchRouter.js.map