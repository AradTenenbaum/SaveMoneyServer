"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// VALIDATION
const Joi = require("@hapi/joi");
// Register Validation
const testValidation = (data) => {
    // VALIDATION SCHEMA
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};
module.exports.testValidation = testValidation;
