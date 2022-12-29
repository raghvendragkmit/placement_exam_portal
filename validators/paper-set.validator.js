const Joi = require("joi");
const { validateRequest } = require("../helper/validate");



module.exports = {
    createPaperSetSchema: async (req, res, next) => {
        const schema = Joi.object({
            subjectName: Joi.string().min(1).required(),
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