import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase, one lowercase, one number and one speacial character",
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string()
    .min(8)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    )
    //to make sure to make it diff not simmiler
    .invalid(Joi.ref("currentPassword"))
    .required()
    .messages({
      "string.pattern.base ":
        "Password must contain at least one uppercase, one lowercase, one number and one speacial character",
      "any.invalid": "New password cannot be the same as current password",
    }),
});
