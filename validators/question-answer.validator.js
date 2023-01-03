const Joi = require('joi');
const { validateRequest } = require('../helpers/validate.helper');
module.exports = {
  questionAnswerSchema: async (req, res, next) => {
    const questionAnswer = Joi.object().keys({
      answerDescription: Joi.string().min(1).required(),
      isCorrect: Joi.bool().required()
    });
    const schema = Joi.object({
      paperSetName: Joi.string().min(1).required(),
      questionDescription: Joi.string().min(1).required(),
      options: Joi.array().items(questionAnswer)
    });
    validateRequest(req, res, next, schema, 'body');
  },
  questionIdSchema: async (req, res, next) => {
    const schema = Joi.object({
      questionId: Joi.string().guid().required()
    });
    validateRequest(req, res, next, schema, 'params');
  },

  questionDescriptionSchema: async (req, res, next) => {
    const schema = Joi.object({
      questionId: Joi.string().min(1).required()
    });
    validateRequest(req, res, next, schema, 'body');
  },
  answerDescriptionSchema: async (req, res, next) => {
    const schema = Joi.object({
      questionId: Joi.string().min(1).required()
    });
    validateRequest(req, res, next, schema, 'body');
  },
  answerIdSchema: async (req, res, next) => {
    const schema = Joi.object({
      questionId: Joi.string().guid().required()
    });
    validateRequest(req, res, next, schema, 'params');
  },
  questionAnswersSchema: async (req, res, next) => {
    const questionAnswer = Joi.object().keys({
      answerDescription: Joi.string().min(1).required(),
      isCorrect: Joi.bool().required()
    });

    const PaperSet = Joi.object().keys({
      paperSetName: Joi.string().min(1).required(),
      questionDescription: Joi.string().min(1).required(),
      options: Joi.array().items(questionAnswer)
    });

    const schema = Joi.object({
      questionAnswers: Joi.array().items(PaperSet)
    });
    validateRequest(req, res, next, schema, 'body');
  }
};
