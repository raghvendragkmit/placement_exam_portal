const Joi = require("joi")
const { validateRequest } = require("../helpers/validate.helper")
module.exports = {
	questionAnswerSchema: async (req, res, next) => {
		const questionAnswer = Joi.object().keys({
			answerDescription: Joi.string().min(1).required(),
			isCorrect: Joi.bool().required(),
		})
		const schema = Joi.object({
			paperSetName: Joi.string().min(1).required(),
			questionDescription: Joi.string().min(1).required(),
			options: Joi.array().items(questionAnswer),
		})
		validateRequest(req, res, next, schema, "body")
	},
	questionIdSchema: async (req, res, next) => {
		const schema = Joi.object({
			questionId: Joi.string().guid().required(),
		})
		validateRequest(req, res, next, schema, "params")
	},
}
