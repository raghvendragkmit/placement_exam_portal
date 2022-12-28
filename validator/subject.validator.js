const Joi = require("joi");

module.exports = {
    createSubjectSchema: async (req, res, next) => {
        const schema = Joi.object({
            subjectName:Joi.string().required()
        });

        validateRequest(req, res, next, schema, "body");
    },

   
};