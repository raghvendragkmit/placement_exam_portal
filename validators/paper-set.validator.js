const Joi = require('joi');
const { validateRequest } = require('../helpers/validate.helper');

module.exports = {
  createPaperSetSchema: async (req, res, next) => {
    const schema = Joi.object({
      subjectName: Joi.string().min(1).required(),
      paperSetName: Joi.string().min(1).required(),
      marksPerQuestion: Joi.number().min(1).required(),
      negativeMarksPerWrongAnswer: Joi.number().min(1).required()
    });

    validateRequest(req, res, next, schema, 'body');
  },

  paperSetIdSchema: async (req, res, next) => {
    const schema = Joi.object({
      paperSetId: Joi.string().guid().required()
    });
    validateRequest(req, res, next, schema, 'params');
  }
};
