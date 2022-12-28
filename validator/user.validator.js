const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const { validateRequest } = require("../helper/validate");

const complexityOptions = {
    min: 4,
    max: 16,
};

module.exports = {
    createUserSchema: async (req, res, next) => {
        const schema = Joi.object({
            firstName: Joi.string().min(1).required(),
            lastName: Joi.string().min(1).required(),
            email: Joi.string().email().lowercase().required(),
            password: passwordComplexity(complexityOptions).required(),
            organization: Joi.string().min(1).required(),
            role: Joi.string().valid("Admin","User").required(),
        });

        validateRequest(req, res, next, schema, "body");
    },

    loginSchema: async (req, res, next) => {
        const schema = Joi.object({
            email: Joi.string().email().lowercase().required(),
            password: Joi.string().required(),
        });
        validateRequest(req, res, next, schema, "body");
    },
};