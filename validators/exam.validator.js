const Joi = require("joi");
const { validateRequest } = require("../helpers/validate.helper");



module.exports = {
    createExamSchema: async (req, res, next) => {
        const schema = Joi.object({
            subjectName: Joi.string().min(1).required(),
            examStartTime: Joi.time().required(),
            examEndTime: Joi.time().required(),
            examDate: Joi.date().required(),
            examPassingPercentage: Joi.number().min().precision(2)
        });
        validateRequest(req, res, next, schema, "body");
    },
    examIdSchema: async (req, res, next) => {
        const schema = Joi.object({
            examId: Joi.string().guid().required()
        });
        validateRequest(req, res, next, schema, "body");
    }
};