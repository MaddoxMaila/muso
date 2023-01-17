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
var ResourceUploader_1 = require("../../libs/ResourceUploader");
var Track_1 = __importDefault(require("../../libs/Track"));
var ValidationError_1 = __importDefault(require("../../libs/ValidationError"));
var DatabaseSingleton_1 = __importDefault(require("../../prisma/DatabaseSingleton"));
var db = DatabaseSingleton_1["default"].getDb();
var TracksController = {
    getTrack: function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var id, errors, track, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = request.params.id;
                    errors = express_validator_1.validationResult(request);
                    if (!errors.isEmpty())
                        throw new ValidationError_1["default"]("failed validations", { errors: errors.array() });
                    return [4 /*yield*/, Track_1["default"]
                            .getInstance()
                            .getTrack(id)];
                case 1:
                    track = _a.sent();
                    if (!track)
                        throw new Error("could not find the specified song.");
                    response.status(200).json(ApiResponse_1["default"](false, "song found!", { track: track }));
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    response.status(500).json(ApiResponse_1["default"](true, e_1.message, e_1));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    getAllTracks: function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var tracks, e_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Track_1["default"]
                            .getInstance()
                            .getAllTracks((_a = request.user) === null || _a === void 0 ? void 0 : _a.id)];
                case 1:
                    tracks = _b.sent();
                    if (!tracks)
                        throw new Error("failed to retrieve all tracks");
                    response.status(200).json(ApiResponse_1["default"](true, tracks.length > 0 ? "songs found" : "could not find any songs, please add songs!.", { tracks: tracks }));
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _b.sent();
                    response.status(500).json(ApiResponse_1["default"](true, e_2.message, e_2));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    addTrack: function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, name, album, artist, duration, year, audio, artwork, errors, track, e_3;
        var _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 2, , 3]);
                    _a = request.body, name = _a.name, album = _a.album, artist = _a.artist, duration = _a.duration, year = _a.year;
                    audio = (_b = request.files) === null || _b === void 0 ? void 0 : _b.audio;
                    artwork = (_c = request.files) === null || _c === void 0 ? void 0 : _c.artwork;
                    if (!audio)
                        throw new Error("Missing audio file");
                    if (!artwork)
                        throw new Error("Missing artwork file");
                    // check for allow file extensions
                    if (!ResourceUploader_1.isAllowedFile(audio))
                        throw new Error("Unsupported file type, make sure it is an Audio file");
                    if (!ResourceUploader_1.isAllowedFile(artwork))
                        throw new Error("Unsupported file type, make sure it is an Image file");
                    errors = express_validator_1.validationResult(request);
                    if (!errors.isEmpty())
                        throw new ValidationError_1["default"]("failed validations", { errors: errors.array() });
                    if (!parseInt(duration) || !parseInt(year))
                        throw new Error("Supply valid numbers for track duration and year");
                    return [4 /*yield*/, Track_1["default"]
                            .getInstance()
                            .addTrack({ name: name, album: album, artist: artist, duration: parseInt(duration), year: parseInt(year), audio: audio, artwork: artwork, userId: (_d = request.user) === null || _d === void 0 ? void 0 : _d.id })];
                case 1:
                    track = _e.sent();
                    if (!track)
                        throw new Error("failed to add track");
                    response.status(200).json(ApiResponse_1["default"](false, "saved track successfully", { track: track }));
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _e.sent();
                    response.status(500).json(ApiResponse_1["default"](true, e_3.message, e_3));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    deleteTrack: function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var id, errors, track, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = request.params.id;
                    errors = express_validator_1.validationResult(request);
                    if (!errors.isEmpty())
                        throw new ValidationError_1["default"]("failed validations", { errors: errors.array() });
                    return [4 /*yield*/, Track_1["default"]
                            .getInstance()
                            .deleteTrack(id)];
                case 1:
                    track = _a.sent();
                    if (!track)
                        throw new Error("failed to delete track");
                    response.status(200).json(ApiResponse_1["default"](false, "deleted track successfully", { track: track }));
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    response.status(500).json(ApiResponse_1["default"](true, e_4.message, e_4));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    likeTrack: function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var id, errors, like, e_5;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    id = request.params.id;
                    errors = express_validator_1.validationResult(request);
                    if (!errors.isEmpty())
                        throw new ValidationError_1["default"]("failed validations", { errors: errors.array() });
                    return [4 /*yield*/, Track_1["default"]
                            .getInstance()
                            .likeOrUnlikeTrack({ trackId: id, userId: (_a = request.user) === null || _a === void 0 ? void 0 : _a.id })];
                case 1:
                    like = _b.sent();
                    if (!like)
                        throw new Error("Failed to like track");
                    response.status(200).json(ApiResponse_1["default"](false, (like.liked ? 'Liked' : 'Unliked') + " track", { track: like }));
                    return [3 /*break*/, 3];
                case 2:
                    e_5 = _b.sent();
                    response.status(500).json(ApiResponse_1["default"](true, e_5.message, e_5));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    getLikedTracks: function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        var likedTracks, e_6;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Track_1["default"]
                            .getInstance()
                            .getLikedTracks((_a = request.user) === null || _a === void 0 ? void 0 : _a.id)];
                case 1:
                    likedTracks = _b.sent();
                    if (!likedTracks)
                        throw new Error("Failed to compile liked tracks.");
                    response.status(200).json(ApiResponse_1["default"](false, likedTracks.length > 0 ? "Tracks you have liked" : "No liked tracks found", { tracks: likedTracks, user: request.user }));
                    return [3 /*break*/, 3];
                case 2:
                    e_6 = _b.sent();
                    response.status(500).json(ApiResponse_1["default"](true, e_6.message, e_6));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    shuffleTracks: function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    }); }
};
exports["default"] = TracksController;
//# sourceMappingURL=TracksController.js.map