import Joi from "joi";

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})

export const signupSchema = Joi.object({
    username: Joi.string().alphanum().required(),
    email: Joi.string().email().pattern(/^[^A-Z]*$/).required().messages({
      "string.pattern.base": "Email must be in lowercase"
    }),
    password: Joi.string().min(8).required()
})

// export const userIdSchema = Joi.object({
//     userId: Joi.string().required()
// })
