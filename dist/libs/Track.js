"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var MusoResourceUploader_1 = require("./MusoResourceUploader");
var DatabaseSingleton_1 = __importDefault(require("../prisma/DatabaseSingleton"));
var runtime_1 = require("@prisma/client/runtime");
var Muso = /** @class */ (function () {
    function Muso() {
        this.db = DatabaseSingleton_1["default"].getDb();
    }
    Muso.prototype.getAllTracks = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.track.findMany({
                                where: { userId: userId },
                                include: { likedTracks: true }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        if (e_1 instanceof runtime_1.PrismaClientValidationError)
                            return [2 /*return*/, null];
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Muso.prototype.getTrack = function (trackId) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.track.findUnique({
                                where: {
                                    id: trackId
                                }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_2 = _a.sent();
                        if (e_2 instanceof runtime_1.PrismaClientValidationError)
                            return [2 /*return*/, null];
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Muso.prototype.addTrack = function (track) {
        return __awaiter(this, void 0, void 0, function () {
            var artwork_url, audio_url, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if ((typeof track.artwork !== "object" || Array.isArray(track.artwork))
                            ||
                                (typeof track.audio !== "object" || Array.isArray(track.audio)))
                            throw Error("Please upload a valid file!");
                        return [4 /*yield*/, MusoResourceUploader_1.saveArtwork(track.artwork)];
                    case 1:
                        artwork_url = _a.sent();
                        return [4 /*yield*/, MusoResourceUploader_1.saveAudio(track.audio)];
                    case 2:
                        audio_url = _a.sent();
                        return [4 /*yield*/, this.db.track.create({
                                data: __assign(__assign({}, track), { audio: audio_url, artwork: artwork_url })
                            })];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        e_3 = _a.sent();
                        if (e_3 instanceof runtime_1.PrismaClientValidationError)
                            return [2 /*return*/, null];
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Muso.prototype.deleteTrack = function (trackId) {
        return __awaiter(this, void 0, void 0, function () {
            var e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.track["delete"]({
                                where: {
                                    id: trackId
                                }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_4 = _a.sent();
                        if (e_4 instanceof runtime_1.PrismaClientValidationError)
                            return [2 /*return*/, null];
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Muso.prototype.likeOrUnlikeTrack = function (like) {
        return __awaiter(this, void 0, void 0, function () {
            var likeTrack, liked, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        likeTrack = null;
                        liked = false;
                        return [4 /*yield*/, this.db.likedTracks.count({ where: { trackUserId: like.trackId + "-" + like.userId } })];
                    case 1:
                        if (!((_a.sent()) === 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.db.likedTracks.create({
                                data: __assign(__assign({}, like), { trackUserId: like.trackId + "-" + like.userId })
                            })];
                    case 2:
                        // Like the track
                        likeTrack = _a.sent();
                        liked = true;
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.db.likedTracks["delete"]({
                            where: { trackUserId: like.trackId + "-" + like.userId }
                        })];
                    case 4:
                        // Unlike the track
                        likeTrack = _a.sent();
                        liked = false;
                        _a.label = 5;
                    case 5: return [2 /*return*/, { liked: liked, likeTrack: likeTrack }];
                    case 6:
                        e_5 = _a.sent();
                        if (e_5 instanceof runtime_1.PrismaClientValidationError)
                            return [2 /*return*/, null];
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Muso.prototype.getLikedTracks = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.likedTracks.findMany({
                                where: { userId: userId },
                                include: { Track: true }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_6 = _a.sent();
                        if (e_6 instanceof runtime_1.PrismaClientValidationError)
                            return [2 /*return*/, null];
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Muso;
}());
var TracksSingleton = /** @class */ (function () {
    function TracksSingleton() {
        TracksSingleton.muso = new Muso();
    }
    TracksSingleton.getInstance = function () {
        if (!TracksSingleton.muso)
            new TracksSingleton();
        return TracksSingleton.muso;
    };
    return TracksSingleton;
}());
exports["default"] = TracksSingleton;
//# sourceMappingURL=Track.js.map