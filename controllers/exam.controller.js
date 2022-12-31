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
};

module.exports = {
    createExam,
  
}