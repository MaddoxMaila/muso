import { ValidationChain, check } from "express-validator"

export const EMPTY_FIELD: string = "field cannot be empty"

export const validate = (field: string, message: string): ValidationChain => {
    return check("id").exists().withMessage("supply a track id").notEmpty().withMessage(`field "${field} cannot be empty"`)
}