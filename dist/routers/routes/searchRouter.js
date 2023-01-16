"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var SearchController_1 = __importDefault(require("../../controllers/search/SearchController"));
var validations_1 = require("../validations");
var router = express_1.Router();
/**
 * @description 1. search tracks and playlists
 * @endpoint http://localhost:2828/api/v1/search/
 */
router.get("/", validations_1.validate("q", "field does not exist"), SearchController_1["default"].search);
exports["default"] = router;
//# sourceMappingURL=searchRouter.js.map