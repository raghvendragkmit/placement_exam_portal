
const services = require('../services');
const { commonErrorHandler } = require("../helpers/common-function.helper");


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



const deletePaperSet = async (req, res, next) => {
    try {
        const { body: payload, params } = req;
        const response = await services.paperSetService.deletePaperSet(payload, params);
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


const getAllPaperSetQuestions = async (req, res, next) => {
    try {
        const { body: payload, params } = req;
        const response = await services.paperSetService.getAllPaperSetQuestions(payload, params);
        res.data = response;
        next();
    } catch (error) {
        commonErrorHandler(req, res, error.message, 400, error);
    }
};


const updatePaperSet = async (req, res, next) => {
	try {
		const { body: payload, params } = req
		const response = await services.paperSetService.updatePaperSet(
			payload,
			params
		)
		res.data = response
		next()
	} catch (error) {
		commonErrorHandler(req, res, error.message, 400, error)
	}
}


module.exports = {
	createPaperSet,
	getAllPaperSet,
	deletePaperSet,
	getAllPaperSetQuestions,
	updatePaperSet,
}