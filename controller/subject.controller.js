const services = require('../service');
const { commonErrorHandler } = require("../helper/error-handler");


const createSubject = async (req, res, next) => {
    try {
        const { body: payload } = req;
        const response = await services.subjectService.createSubject(payload);
        res.data = response;
        next();
    } catch (error) {
        commonErrorHandler(req, res, error.message, 400, error);
    }
};


const deleteSubject = async (req, res, next) => {
    try {
        const { body: payload, params } = req;
        const response = await services.subjectService.deleteSubject(payload, params);
        res.data = response;
        next();
    } catch (error) {
        commonErrorHandler(req, res, error.message, 400, error);
    }
};


const getAllSubject = async (req, res, next) => {
    try {
        const { body: payload } = req;
        const response = await services.subjectService.getAllSubject();
        res.data = response;
        next();
    } catch (error) {
        commonErrorHandler(req, res, error.message, 400, error);
    }
};

module.exports = {
    createSubject,
    deleteSubject,
    getAllSubject
}