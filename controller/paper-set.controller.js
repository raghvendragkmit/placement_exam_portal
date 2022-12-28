const services = require('../service');
const { commonErrorHandler } = require("../helper/error-handler");


const createPaperSet = async (req, res, next) => {
    try {
        const { body: payload } = req;
        const response = await services.paperSetService.createPaperSet(payload);
        res.data = response;
        next();
    } catch (error) {
        commonErrorHandler(req, res, error.message, 400, error);
    }
};





const getAllPaperSet = async (req, res, next) => {
    try {
        const { body: payload } = req;
        const response = await services.paperSetService.getAllPaperSet();
        res.data = response;
        next();
    } catch (error) {
        commonErrorHandler(req, res, error.message, 400, error);
    }
};

module.exports = {
    createPaperSet,
    getAllPaperSet
}