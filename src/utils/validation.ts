// VALIDATION
const Joi = require("@hapi/joi");
import type {UserType} from './types';

// Register Validation
const testValidation:any = (data: UserType)=> {
   
    // VALIDATION SCHEMA
    const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};



module.exports.testValidation = testValidation;
