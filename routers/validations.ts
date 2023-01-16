import { ValidationChain, check } from "express-validator"

export const EMPTY_FIELD: string = "field cannot be empty"

export const validate = (field: string, message: string): ValidationChain => {
    return check(field).exists().withMessage(`supply this field "${field}"`).notEmpty().withMessage(`field "${field}" cannot be empty`)
}