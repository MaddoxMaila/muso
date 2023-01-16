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
var ApiResponse_1 = __importDefault(require("../../libs/ApiResponse"));
var Helper_1 = __importDefault(require("../../utils/Helper"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var DatabaseSingleton_1 = __importDefault(require("../../prisma/DatabaseSingleton"));
var db = DatabaseSingleton_1["default"].getDb();
var AuthController = {
    /**
     * @description
     * get email, name, password from req.body
     * do validation
     * check already have an account or not(mySql Optional,Mongo required)
     * create password hash,save into database
     * generate a jwt access token,set into http cookie
     * return new user object as response
     * @param { email, name, password, type } = req.body
     * @response {error(boolean), message(String), response(object:USER)}
     */
    signUp: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, name, password, hashpass, _b, _c, _d, u, user, token, e_1, response;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 5, , 6]);
                    _a = req.body, email = _a.email, name = _a.name, password = _a.password;
                    //validatioin handle by sequlize
                    if (password.length < 6) {
                        throw new Error("Password Length Should be More than 5 character.");
                    }
                    _c = (_b = bcryptjs_1["default"]).hash;
                    _d = [password];
                    return [4 /*yield*/, bcryptjs_1["default"].genSalt(10)];
                case 1: return [4 /*yield*/, _c.apply(_b, _d.concat([_e.sent()]))
                    //save on database
                ];
                case 2:
                    hashpass = _e.sent();
                    return [4 /*yield*/, db.admin.findUnique({
                            where: {
                                email: email
                            }
                        })];
                case 3:
                    u = _e.sent();
                    if (u) {
                        throw new Error("Already Registered with this email.");
                    }
                    return [4 /*yield*/, db.admin.create({
                            data: {
                                name: name,
                                email: email,
                                password: hashpass
                            }
                        })
                        //get token and set into cookie
                    ];
                case 4:
                    user = _e.sent();
                    token = Helper_1["default"].getJWTtoken(user.id + "");
                    //, token-if you want you can pass the token
                    res.status(200).json(ApiResponse_1["default"](false, "user created successfully", { user: user, token: token }));
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _e.sent();
                    console.log("auth sign up: ", e_1);
                    response = ApiResponse_1["default"](true, e_1.message, e_1);
                    res.json(response);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); },
    login: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, email, password, u, user, ckPass, token, e_2, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, email = _a.email, password = _a.password;
                    //validatioin
                    if (!email || !password) {
                        throw new Error("Enter email,password");
                    }
                    return [4 /*yield*/, db.admin.findUnique({
                            where: {
                                email: email
                            }
                        })];
                case 1:
                    u = _b.sent();
                    if (!u) {
                        throw new Error("No User Found with this email!");
                    }
                    user = u;
                    return [4 /*yield*/, bcryptjs_1["default"].compare(password, user.password)];
                case 2:
                    ckPass = _b.sent();
                    if (!ckPass) {
                        throw new Error("Wrong email or password");
                    }
                    token = Helper_1["default"].getJWTtoken(user.id + "");
                    //, token-if you want you can pass the token
                    res.status(200).json(ApiResponse_1["default"](false, "user logged in successfully", { token: token, user: user }));
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _b.sent();
                    console.log("auth login: ", e_2);
                    response = ApiResponse_1["default"](true, e_2.message, e_2);
                    res.json(response);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }
};
exports["default"] = AuthController;
//# sourceMappingURL=AuthController.js.map