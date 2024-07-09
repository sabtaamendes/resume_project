import joi from "joi";

export const candidatesSchema = joi.object({
    fullname: joi.string().required(),
    phone: joi.string().max(11).required(),
    email: joi.string().email().required(),
    desired_position: joi.string().required()
});
