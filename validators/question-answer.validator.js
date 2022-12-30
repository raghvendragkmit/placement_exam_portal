const Joi = require("joi");
const { validateRequest } = require("../helpers/validate.helper");



module.exports = {
    createQuestionAnswerSchema: async (req, res, next) => {

        let service = Joi.object().keys({
            answerDescription: Joi.string().required().min(1),
            isCorrect: Joi.bool().required()
        })

        const schema = Joi.object({
            paperSetId: Joi.string().guid().required(),
            questionDescription: Joi.string().min(10).required(),
            options: Joi.array().items(service)
        });

        validateRequest(req, res, next, schema, "body");
    },


    paperSetIdSchema: async (req, res, next) => {
        const schema = Joi.object({
            paperSetId: Joi.string().guid().required()
        });
        validateRequest(req, res, next, schema, 'params');
    },
};