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
exports.__esModule = true;
function ApiResponse(error, message, response) {
    if (response instanceof Error) {
        // Only print Errors
        console.log(response);
    }
    return __assign({ error: error, message: message }, response);
}
exports["default"] = ApiResponse;
//# sourceMappingURL=ApiResponse.js.map