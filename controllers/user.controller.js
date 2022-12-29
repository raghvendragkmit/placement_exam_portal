const services = require('../services');
const { commonErrorHandler } = require("../helpers/common-function.helper");


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
}

const refreshToken = async (req, res, next) => {
    try {
        const { body: payload } = req.body;

        const data = await services.userService.refreshToken(payload);
        res.data = data;
        next();
    } catch (error) {
        commonErrorHandler(req, res, error.message, 400, error);
    }
};

const forgetPassword = async (req, res, next) => {
    try {
        const { body: payload } = req;
        const data = await services.userService.forgetPassword(payload);
        res.data = data;
        next();
    } catch (error) {
        commonErrorHandler(req, res, error.message, 400, error);
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const { body: payload, params } = req;
        const data = await services.userService.resetPassword(payload, params);
        res.data = data;
        next();
    } catch (error) {
        commonErrorHandler(req, res, error.message, 400, error);
    }
}

const logoutUser = async (req, res, next) => {
    try {
        const data = await userService.logoutUser(requestToken);
        res.data = data;
        next();
    } catch (error) {
        commonErrorHandler(req, res, error.message, 400, error);
    }
}


module.exports = {
    createUser,
    loginUser,
    deleteUser,
    getAllUser,
    refreshToken,
    forgetPassword,
    resetPassword
}