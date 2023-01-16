"use strict";
exports.__esModule = true;
exports.validate = exports.EMPTY_FIELD = void 0;
var express_validator_1 = require("express-validator");
exports.EMPTY_FIELD = "field cannot be empty";
var validate = function (field, message) {
    return express_validator_1.check("id").exists().withMessage("supply a track id").notEmpty().withMessage("field \"" + field + " cannot be empty\"");
};
exports.validate = validate;
//# sourceMappingURL=validations.js.map