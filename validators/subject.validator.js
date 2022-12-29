const Joi = require("joi");
const { validateRequest } = require("../helpers/validate.helper");
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