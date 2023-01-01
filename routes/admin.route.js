const { Router } = require("express")
const controllers = require("../controllers")
const genericResponse = require("../helpers/common-function.helper")
const authMiddleware = require("../middlewares/auth")
const validator = require("../validators/index")
const serializer = require("../serializers")
const router = Router()

router.post(
	"/subject",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	validator.subjectValidator.subjectNameSchema,
	controllers.subjectController.createSubject,
	genericResponse.sendResponse
)

router.get(
	"/subjects",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	controllers.subjectController.getAllSubject,
	serializer.subjectSerializer.getAllSubject,
	genericResponse.sendResponse
)

router.delete(
	"/subject/:subjectId",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	validator.subjectValidator.subjectIdSchema,
	controllers.subjectController.deleteSubject,
	genericResponse.sendResponse
)

router.post(
	"/question-answer",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	validator.questionAnswerValidator.questionAnswerSchema,
	controllers.questionAnswerController.createQuestionAnswer,
	genericResponse.sendResponse
)

router.post(
	"/question-answers",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	validator.questionAnswerValidator.questionAnswersSchema,
	controllers.questionAnswerController.createQuestionAnswers,
	genericResponse.sendResponse
)

router.get(
	"/question-answers",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
    controllers.questionAnswerController.getAllQuestionAnswer,
    serializer.questionAnswerSerializer.questionAnswers,
	genericResponse.sendResponse
)

router.get(
	"/question-answer/:questionId",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	validator.questionAnswerValidator.questionIdSchema,
	controllers.questionAnswerController.getQuestionAnswerById,
	serializer.questionAnswerSerializer.questionAnswer,
	genericResponse.sendResponse
)

router.patch(
	"/question/:questionId",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	controllers.questionAnswerController.updateQuestionDescription,
	genericResponse.sendResponse
)

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

router.patch(
	"/answer/:answerId",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	controllers.questionAnswerController.updateAnswerDescription,
	genericResponse.sendResponse
)

router.get(
	"/users",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	controllers.userController.getAllUser,
	serializer.userSerializer.getAllUser,
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
	"/subject",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	validator.subjectValidator.subjectNameSchema,
	controllers.subjectController.createSubject,
	serializer.subjectSerializer.subjectNameId,
	genericResponse.sendResponse
)

router.get(
	"/subjects",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	controllers.subjectController.getAllSubject,
	serializer.subjectSerializer.getAllSubject,
	genericResponse.sendResponse
)

router.delete(
	"/subject/:subjectId",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	validator.subjectValidator.subjectIdSchema,
	controllers.subjectController.deleteSubject,
	genericResponse.sendResponse
)

router.patch(
	"/subject/:subjectId",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	validator.subjectValidator.subjectIdSchema,
	validator.subjectValidator.subjectNameSchema,
	controllers.subjectController.updateSubject,
	serializer.subjectSerializer.subjectNameId,
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
