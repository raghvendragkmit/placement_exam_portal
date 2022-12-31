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
        validateRequest(req, res, next, schema, "params");
    },
    submitExam: async (req, res, next) => {

        let service = Joi.object().keys({
            questionId: Joi.string().guid().required(),
            asnwerId: Joi.string().guid().required()
        })

        const schema = Joi.object({
            examId: Joi.string().guid().required(),
            paperSetId: Joi.string().guid().required(),
            response: Joi.array().items(service)
        });
        validateRequest(req, res, next, schema, "body");
    },
    examLogResponse: async (req, res, next) => {

        const schema = Joi.object({
            examId: Joi.string().guid().required(),
            paperSetId: Joi.string().guid().required(),
            examId: Joi.string().guid().required(),
            questionId: Joi.string().guid().required(),
            answerId: Joi.string().guid().required(),
        });
        validateRequest(req, res, next, schema, "body");
    },
};