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
exports.__esModule = true;
exports.isAllowedFile = exports.saveAudio = exports.saveArtwork = void 0;
var crypto_1 = require("crypto");
var newFileName = function (fileName) {
    return crypto_1.randomUUID() + "." + fileExt(fileName);
};
var fileExt = function (fileName) {
    var name = fileName.split(".");
    return name[name.length - 1];
};
var saveArtwork = function (artworkFile) { return __awaiter(void 0, void 0, void 0, function () {
    var PATH, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                artworkFile.name = newFileName(artworkFile.name);
                PATH = process.env.ARTWORK_PATH || './public/artwork';
                return [4 /*yield*/, artworkFile.mv(PATH + "/" + artworkFile.name)];
            case 1:
                _a.sent();
                return [2 /*return*/, "/public/artwork/" + artworkFile.name];
            case 2:
                e_1 = _a.sent();
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.saveArtwork = saveArtwork;
var saveAudio = function (audioFile) { return __awaiter(void 0, void 0, void 0, function () {
    var PATH, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                audioFile.name = newFileName(audioFile.name);
                PATH = process.env.AUDIO_PATH || './public/audios';
                return [4 /*yield*/, audioFile.mv(PATH + "/" + audioFile.name)];
            case 1:
                _a.sent();
                return [2 /*return*/, "/public/artwork/" + audioFile.name];
            case 2:
                e_2 = _a.sent();
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.saveAudio = saveAudio;
var isAllowedFile = function (file) {
    if (Array.isArray(file))
        return false;
    var ext = fileExt(file.name);
    return ext === "jpeg" || ext === "jpg" || ext === 'png' || ext === 'webm' || ext === 'mp3' || ext === 'm4a' || ext === 'flac';
};
exports.isAllowedFile = isAllowedFile;
//# sourceMappingURL=ResourceUploader.js.map