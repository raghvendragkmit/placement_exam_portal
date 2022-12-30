const services = require('../services');
const { commonErrorHandler } = require("../helpers/common-function.helper");


const createQuestionAnswer = async (req, res, next) => {
    try {
        const { body: payload } = req;
        console.log(payload);
        const response = await services.questionAnswerService.createQuestionAnswer(payload);
        if (response.error) {
            throw new Error(response.error.message);
        }
        res.data = response.data;
        next();
    } catch (error) {
        commonErrorHandler(req, res, error.message, 400, error);
    }
}


const getQuestionAnswerById =  async (req, res, next) => {
    try {
        const { body: payload,params } = req;
        console.log(payload);
        const response = await services.questionAnswerService.getQuestionAnswerById(payload,params);
        res.data = response;
        next();
    } catch (error) {
        commonErrorHandler(req, res, error.message, 400, error);
    }
}


const createQuestionAnswers = async (req, res, next) => {
    try {
        const { body: payload } = req;
        console.log(payload);
        const response = await services.questionAnswerService.createQuestionAnswers(payload);
        res.data = response;
        next();
    } catch (error) {
        commonErrorHandler(req, res, error.message, 400, error);
    }
}

const getAllQuestionAnswer = async (req, res, next) => {
    try {
        const { body: payload } = req;
        const response = await services.questionAnswerService.getAllQuestionAnswer();
        res.data = response;
        next();
    } catch (error) {
        commonErrorHandler(req, res, error.message, 400, error);
    }
}



const updateQuestionDescription = async (req, res, next) => {
    try {
        const { body: payload, params } = req;
        const response = await services.questionAnswerService.updateQuestionDescription(payload, params);
        res.data = response;
        next();
    } catch (error) {
        commonErrorHandler(req, res, error.message, 400, error);
    }
}


const updateAnswerDescription = async (req, res, next) => {
    try {
        const { body: payload, params } = req;
        const response = await services.questionAnswerService.updateAnswerDescription(payload, params);
        res.data = response;
        next();
    } catch (error) {
        commonErrorHandler(req, res, error.message, 400, error);
    }
}

module.exports = {

    createQuestionAnswer,
    getAllQuestionAnswer,
    createQuestionAnswers,
    updateQuestionDescription,
    updateAnswerDescription,
    getQuestionAnswerById
}

