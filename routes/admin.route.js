const { Router } = require("express")
const controllers = require("../controllers")
const genericResponse = require("../helpers/common-function.helper")
const authMiddleware = require("../middlewares/auth")
const validator = require("../validators/index")
const serializer = require("../serializers")
const router = Router()

router.post(
	"/user",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	validator.userValidator.createUserSchema,
	controllers.userController.createUser,
	serializer.userSerializer.createUser,
	genericResponse.sendResponse
)

router.post(
	"/login",
	validator.userValidator.loginSchema,
	controllers.userController.loginUser,
	genericResponse.sendResponse
)

router.delete(
	"/user/:userId",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	validator.userValidator.userIdSchema,
	controllers.userController.deleteUser,
	genericResponse.sendResponse
)

router.get(
	"/users",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	controllers.userController.getAllUser,
	genericResponse.sendResponse
)

router.get(
	"/refresh-token",
	authMiddleware.checkRefreshToken,
	controllers.userController.refreshToken,
	genericResponse.sendResponse
)

router.post(
	"/forget-password",
	validator.userValidator.forgetPassword,
	controllers.userController.forgetPassword,
	genericResponse.sendResponse
)

router.post(
	"/reset-password/:token",
	validator.userValidator.resetPasswordTokenSchema,
	validator.userValidator.resetPasswordSchema,
	controllers.userController.resetPasswordByToken,
	genericResponse.sendResponse
)

router.post(
	"/reset-user-password",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	validator.userValidator.adminResetUserPasswordSchema,
	controllers.userController.adminResetPassword,
	genericResponse.sendResponse
)

router.post(
	"/reset-password",
	authMiddleware.checkAccessToken,
	validator.userValidator.resetPasswordSchema,
	controllers.userController.resetPassword,
	genericResponse.sendResponse
)

module.exports = router
