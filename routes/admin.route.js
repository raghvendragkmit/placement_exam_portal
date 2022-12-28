const { Router } = require("express");
const controllers = require("../controller");
const genericResponse = require("../helper/generic-response");
const authMiddleware = require('../middleware/auth');
const validator = require('../validator/index');
const router = Router();

router.post(
    '/user',
    authMiddleware.checkAccessToken,
    authMiddleware.verifyAdmin,
    validator.userValidator.createUserSchema,
    controllers.userController.createUser,
    genericResponse.sendResponse
);


router.post('/login',
    validator.userValidator.loginSchema,
    controllers.userController.loginUser,
    genericResponse.sendResponse
);




router.delete(
    '/user/:userId',
    authMiddleware.checkAccessToken,
    authMiddleware.verifyAdmin,
    validator.userValidator.userIdSchema,
    controllers.userController.deleteUser,
    genericResponse.sendResponse
);


router.get(
    '/users',
    authMiddleware.checkAccessToken,
    authMiddleware.verifyAdmin,
    controllers.userController.getAllUser,
    genericResponse.sendResponse
);


router.get(
    "/refresh-token",
    authMiddleware.checkRefreshToken,
    controllers.userController.refreshToken,
    genericResponse.sendResponse
);

router.post(
    "/forget-password",
    validator.userValidator.forgetPassword,
    controllers.userController.forgetPassword,
    genericResponse.sendResponse
);

router.post(
    "/reset-password/:token",
    validator.userValidator.resetPasswordTokenSchema,
    validator.userValidator.resetPasswordSchema,
    controllers.userController.resetPassword,
    genericResponse.sendResponse
);


module.exports = router;