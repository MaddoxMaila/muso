"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_validator_1 = require("express-validator");
var ApiResponse_1 = __importDefault(require("../../libs/ApiResponse"));
var ValidationError_1 = __importDefault(require("../../libs/ValidationError"));
var Playlist_1 = __importDefault(require("../../libs/Playlist"));
var DatabaseSingleton_1 = __importDefault(require("../../prisma/DatabaseSingleton"));
var db = DatabaseSingleton_1["default"].getDb();
var PlaylistController = {
    getPlaylists: function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var playlists, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Playlist_1["default"]
                            .playlistInstance()
                            .getPlaylists(request.user.id)];
                case 1:
                    playlists = _a.sent();
                    if (!playlists)
                        throw new Error("failed to retrieve playlists");
                    response.status(200).json(ApiResponse_1["default"](false, "playlists compiled", { playlists: playlists }));
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    response.status(500).json(ApiResponse_1["default"](true, e_1.message, e_1));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    getPlaylistTracks: function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var id, errors, playlistWithTracks, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = request.params.id;
                    errors = express_validator_1.validationResult(request);
                    if (!errors.isEmpty())
                        throw new ValidationError_1["default"]("failed validations", { errors: errors.array() });
                    return [4 /*yield*/, Playlist_1["default"]
                            .playlistInstance()
                            .getPlaylistTracks({ playlistId: id, userId: request.user.id })];
                case 1:
                    playlistWithTracks = _a.sent();
                    if (!playlistWithTracks)
                        throw new Error("failed to retrieve playlist with its tracks");
                    response.status(200).json(ApiResponse_1["default"](false, "playlist with its tracks compiled", { playlist: playlistWithTracks }));
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    response.status(200).json(ApiResponse_1["default"](true, e_2.message, e_2));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    createPlaylist: function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var name, playlistData, errors, c, playlist, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    name = request.body.name;
                    playlistData = { name: name, userId: request.user.id };
                    errors = express_validator_1.validationResult(request);
                    if (!errors.isEmpty())
                        throw new ValidationError_1["default"]("failed validations", { errors: errors.array() });
                    return [4 /*yield*/, db.playlist.count({
                            where: playlistData
                        })];
                case 1:
                    c = _a.sent();
                    if (c > 0)
                        throw new Error("You already have a playlist with this name: " + name);
                    return [4 /*yield*/, Playlist_1["default"]
                            .playlistInstance()
                            .createPlaylist(playlistData)];
                case 2:
                    playlist = _a.sent();
                    if (!playlist)
                        throw new Error("Failed to create a new playlist");
                    response.status(200).json(ApiResponse_1["default"](true, "Playlist \"" + name + "\" created!", { playlist: playlist }));
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    response.status(500).json(ApiResponse_1["default"](true, e_3.message, e_3));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    addTrackToPlaylist: function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, playlistId, trackId, errors, addTrack, e_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    _a = request.body, playlistId = _a.playlistId, trackId = _a.trackId;
                    errors = express_validator_1.validationResult(request);
                    if (!errors.isEmpty())
                        throw new ValidationError_1["default"]("failed validations", { errors: errors.array() });
                    return [4 /*yield*/, db.track.count({ where: { id: trackId } })];
                case 1:
                    // Could let prisma catch constraint errors but I wanted to control the narrative??
                    if ((_b.sent()) == 0)
                        throw new Error("This \"" + trackId + "\" track does not exist ");
                    return [4 /*yield*/, db.playlist.count({ where: { id: playlistId } })];
                case 2:
                    if ((_b.sent()) == 0)
                        throw new Error("This \"" + playlistId + "\" playlist does not exist ");
                    return [4 /*yield*/, Playlist_1["default"]
                            .playlistInstance()
                            .addTrackToPlaylist({ playlistId: playlistId, trackId: trackId })];
                case 3:
                    addTrack = _b.sent();
                    if (!addTrack)
                        throw new Error("Failed to add track to playlist");
                    response.status(200).json(ApiResponse_1["default"](false, "Added track to playlist", { playlistTrack: addTrack }));
                    return [3 /*break*/, 5];
                case 4:
                    e_4 = _b.sent();
                    response.status(500).json(ApiResponse_1["default"](true, e_4.message, e_4));
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); },
    deletePlaylist: function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var id, errors, deletedPlaylist, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = request.params.id;
                    errors = express_validator_1.validationResult(request);
                    if (!errors.isEmpty())
                        throw new ValidationError_1["default"]("failed validations", { errors: errors.array() });
                    return [4 /*yield*/, Playlist_1["default"]
                            .playlistInstance()
                            .deletePlaylist(id)];
                case 1:
                    deletedPlaylist = _a.sent();
                    if (!deletedPlaylist)
                        throw new Error("Failed to delete playlist");
                    response.status(200).json(ApiResponse_1["default"](false, "Playlist deleted", { playlist: deletedPlaylist }));
                    return [3 /*break*/, 3];
                case 2:
                    e_5 = _a.sent();
                    response.status(500).json(ApiResponse_1["default"](true, e_5.message, e_5));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    deletePlaylistTrack: function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var id, errors, deletedPlaylistTrack, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = request.body.id;
                    errors = express_validator_1.validationResult(request);
                    if (!errors.isEmpty())
                        throw new ValidationError_1["default"]("failed validations", { errors: errors.array() });
                    return [4 /*yield*/, Playlist_1["default"]
                            .playlistInstance()
                            .deletePlaylistTrack(id)];
                case 1:
                    deletedPlaylistTrack = _a.sent();
                    if (!deletedPlaylistTrack)
                        throw new Error("Failed to delete track from playlist");
                    response.status(200).json(ApiResponse_1["default"](false, "Track deleted from playlist", { track: deletedPlaylistTrack }));
                    return [3 /*break*/, 3];
                case 2:
                    e_6 = _a.sent();
                    response.status(500).json(ApiResponse_1["default"](true, e_6.message, e_6));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }
};
exports["default"] = PlaylistController;
//# sourceMappingURL=PlaylistController.js.map