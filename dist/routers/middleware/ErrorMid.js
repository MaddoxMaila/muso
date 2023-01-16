"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ApiResponse_1 = __importDefault(require("../../libs/ApiResponse"));
//for all other error
var ErrorMid = function (e, req, res, next) {
    //console.log("error Middleware: ", e.code);
    // if (e.code !== 'EBADCSRFTOKEN') {
    //     return next(e);
    // }
    res.status(403).json(ApiResponse_1["default"](true, e.message, e));
};
//for 404 error
var Error404Mid = function (req, res) {
    res.status(404).json(ApiResponse_1["default"](true, "Not Found", {
        name: "404",
        message: "No Response Found!"
    }));
};
exports["default"] = [ErrorMid, Error404Mid];
//# sourceMappingURL=ErrorMid.js.map