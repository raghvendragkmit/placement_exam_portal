const { Router } = require("express");

const controllers = require("../controller");
const genericResponse = require("../helper/generic-response");
const authMiddleware = require('../middleware/auth');
const router = Router();

router.post(
    '/user',
    authMiddleware.checkAccessToken,
    authMiddleware.verifyAdmin,
    controllers.userController.createUser,
    genericResponse.sendResponse
);


module.exports = router;