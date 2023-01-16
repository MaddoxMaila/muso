"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var helmet_1 = __importDefault(require("helmet"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var ErrorMid_1 = __importDefault(require("./routers/middleware/ErrorMid"));
//import routes
var index_1 = __importDefault(require("./routers/index"));
var ApiKeyMiddleware_1 = __importDefault(require("./routers/middleware/ApiKeyMiddleware"));
var AddUserMiddleware_1 = __importDefault(require("./routers/middleware/AddUserMiddleware"));
//init
dotenv_1.default.config();
var app = express_1.default();
// configurations
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(cookie_parser_1.default());
app.use(helmet_1.default());
app.use(express_fileupload_1.default());
app.use(express_1.default.static(__dirname + "/public/artwork"));
app.use(express_1.default.static(__dirname + "/public/audios"));
//enable cros 
app.use(cors_1.default({ origin: true, credentials: true }));
var BASE_URL = "/api/v1";
var MIDDLWARES = [ApiKeyMiddleware_1.default, AddUserMiddleware_1.default];
//routers
app.get("" + BASE_URL, function (_, res) { return res.send("Running... 🚀"); });
/**
 * Define routes to express so that they can accessible
 * Also added API key middleware here in the top level of which the inclusion will trickle down to each sub-route
 */
app.use(BASE_URL + "/auth", ApiKeyMiddleware_1.default, index_1.default.authRouter);
app.use(BASE_URL + "/tracks", MIDDLWARES, index_1.default.tracksRouter);
app.use(BASE_URL + "/playlists", MIDDLWARES, index_1.default.playlistRouter);
//catch all error
app.use(ErrorMid_1.default);
// createUser({
//     name: "Tshepang",
//     email: "tshepang.maila@ayoba.com",
//     password: "my-password"
// })
var port = process.env.PORT || 2828;
app.listen(port, function () { return console.log("Server Running on PORT " + port); });
//# sourceMappingURL=server.js.map