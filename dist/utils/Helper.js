"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js Eg: 60, "2 days", "10h", "7d"
  */
var getJWTtoken = function (id, expiresIn) {
    if (expiresIn) {
        return jsonwebtoken_1["default"].sign({ id: id }, process.env.ACCESS_SECRET + "", { expiresIn: expiresIn });
    }
    else {
        return jsonwebtoken_1["default"].sign({ id: id }, process.env.ACCESS_SECRET + "");
    }
};
var verifyJWTtoken = function (token) {
    try {
        if (!token) {
            throw new Error("Unauthorized Access");
        }
        var jwtpayload = jsonwebtoken_1["default"].verify(token, process.env.ACCESS_SECRET + "");
        var payload = jwtpayload;
        //console.log("jwt payload: ", payload['id'], "==", payload.id);
        return payload.id;
    }
    catch (e) {
        throw new Error("Unauthorized Access");
    }
};
var verifyApiKey = function (apiKey) {
    /**
     * Verify API KEY
     * Usually if it's multi-client the API KEY would verified against one in a database,
     * But for this purpose I just saved it in an ENV
     */
    return apiKey === process.env.API_KEY;
};
exports["default"] = {
    getJWTtoken: getJWTtoken,
    verifyJWTtoken: verifyJWTtoken,
    verifyApiKey: verifyApiKey
};
//# sourceMappingURL=Helper.js.map