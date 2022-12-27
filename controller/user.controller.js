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


module.exports = {
    createUser,
}