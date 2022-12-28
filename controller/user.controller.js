const services = require('../service');
const { commonErrorHandler } = require("../helper/error-handler");


const createUser = async (req, res, next) => {
    try {
        const { body: payload } = req;
        const response = await services.userService.createUser(payload);
        res.data = response;
        next();
    } catch (error) {
        commonErrorHandler(req, res, error.message, 400, error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { body: payload } = req;
        const response = await services.userService.loginUser(payload);
        res.data = response;
        next();
    } catch (error) {
        commonErrorHandler(req, res, error.message, 400, error);
    }
};


const updateUser = async (req, res, next) => {
    try {
        const { body: payload, params } = req;
        const response = await services.userService.updateUser(payload, params);
        res.data = response;
        next();
    } catch (error) {
        commonErrorHandler(req, res, error.message, 400, error);
    }
}


const deleteUser = async (req, res, next) => {
    try {
        const { body: payload, params } = req;
        const response = await services.userService.deleteUser(payload, params);
        res.data = response;
        next();
    } catch (error) {
        commonErrorHandler(req, res, error.message, 400, error);
    }
};

const getAllUser = async (req, res, next) => {
    try {
        const { body: payload } = req;
        const response = await services.userService.getAllUser();
        res.data = response;
        next();
    } catch (error) {
        commonErrorHandler(req, res, error.message, 400, error);
    }
};


module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser
}