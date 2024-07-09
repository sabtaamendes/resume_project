import { candidatesSchema } from "../schemas/candidates.schema.js";

export async function validateCandidates(req, res, next) {
    const { error } = candidatesSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details);
    }
    next();
}