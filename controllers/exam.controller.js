const services = require('../services');
const { commonErrorHandler } = require("../helpers/common-function.helper");



const createExam = async (req, res, next) => {
    try {
        const { body: payload } = req;
        const response = await services.examService.createExam(payload);
        res.data = response;
        next();
    } catch (error) {
        commonErrorHandler(req, res, error.message, 400, error);
    }
}


const deleteExam = async (req, res, next) => {
    try {
        const { body: payload, params } = req;
        const response = await services.examService.deleteExam(payload, params);
        res.data = response;
        next();
    } catch (error) {
        commonErrorHandler(req, res, error.message, 400, error);
    }
}



const getAllExam = async (req, res, next) => {
    try {
        const { body: payload } = req;
        const response = await services.examService.getAllExam(payload);
        res.data = response;
        next();
    } catch (error) {
        commonErrorHandler(req, res, error.message, 400, error);
    }
}
module.exports = {
    createExam,
    deleteExam,
    getAllExam
}