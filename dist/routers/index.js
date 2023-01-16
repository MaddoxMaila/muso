"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var authRouter_1 = __importDefault(require("./authRouter"));
var tracksRouter_1 = __importDefault(require("./tracksRouter"));
var playlistRouter_1 = __importDefault(require("./playlistRouter"));
var searchRouter_1 = __importDefault(require("./searchRouter"));
var Routers = {
    authRouter: authRouter_1.default,
    tracksRouter: tracksRouter_1.default,
    playlistRouter: playlistRouter_1.default,
    searchRouter: searchRouter_1.default
};
exports.default = Routers;
//# sourceMappingURL=index.js.map