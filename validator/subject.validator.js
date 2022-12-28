const Joi = require("joi");
const { validateRequest } = require("../helper/validate");
module.exports = {
    createSubjectSchema: async (req, res, next) => {
        const schema = Joi.object({
            subjectName: Joi.string().required()
        });
        validateRequest(req, res, next, schema, "body");
    },
    subjectIdSchema: async (req, res, next) => {
        const schema = Joi.object({
            subjectId: Joi.string().guid().required()
        });
        validateRequest(req, res, next, schema, 'params');
    },


};