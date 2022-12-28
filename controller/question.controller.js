const services = require('../service');
const { commonErrorHandler } = require("../helper/error-handler");


const
    createQuestionAnswer = async (req, res, next) => {
        try {
            const { body: payload } = req;
            console.log(payload);
            const response = await services.questionService.createQuestionAnswer(payload);
            if (response.error) {
                throw new Error(response.error.message);
            }
            res.data = response.data;
            next();
        } catch (error) {
            commonErrorHandler(req, res, error.message, 400, error);
        }
    }

module.exports = {

    createQuestionAnswer
}