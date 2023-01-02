const { Router } = require("express")
const userController = require("../controllers/user.controller")
const subjectController = require("../controllers/subject.controller")
const questionAnswerController = require("../controllers/question-answer.controller")
const genericResponse = require("../helpers/common-function.helper")
const authMiddleware = require("../middlewares/auth")

const userValidator = require("../validators/user.validator")
const subjectValidator = require("../validators/subject.validator")
const questionAnswerValidator = require("../validators/question-answer.validator")

const userSerializer = require("../serializers/user.serializer")
const subjectSerializer = require("../serializers/subject.serializer")
const questionAnswerSerializer = require("../serializers/question-answer.serializer")
const router = Router()

router.post(
	"/question-answer",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	questionAnswerValidator.questionAnswerSchema,
	questionAnswerController.createQuestionAnswer,
	genericResponse.sendResponse
)

router.post(
	"/question-answers",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	questionAnswerValidator.questionAnswersSchema,
	questionAnswerController.createQuestionAnswers,
	genericResponse.sendResponse
)

router.get(
	"/question-answers",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	questionAnswerController.getAllQuestionAnswer,
	questionAnswerSerializer.questionAnswers,
	genericResponse.sendResponse
)

router.get(
	"/question-answer/:questionId",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	questionAnswerValidator.questionIdSchema,
	questionAnswerController.getQuestionAnswerById,
	questionAnswerSerializer.questionAnswer,
	genericResponse.sendResponse
)

router.patch(
	"/question/:questionId",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	questionAnswerController.updateQuestionDescription,
	genericResponse.sendResponse
)

router.post(
	"/user",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	userValidator.createUserSchema,
	userController.createUser,
	userSerializer.createUser,
	genericResponse.sendResponse
)

router.post(
	"/login",
	userValidator.loginSchema,
	userController.loginUser,
	genericResponse.sendResponse
)

router.delete(
	"/user/:userId",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	userValidator.userIdSchema,
	userController.deleteUser,
	genericResponse.sendResponse
)

router.patch(
	"/answer/:answerId",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	questionAnswerController.updateAnswerDescription,
	genericResponse.sendResponse
)

router.get(
	"/users",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	userController.getAllUser,
	userSerializer.getAllUser,
	genericResponse.sendResponse
)

router.get(
	"/refresh-token",
	authMiddleware.checkRefreshToken,
	userController.refreshToken,
	genericResponse.sendResponse
)

router.post(
	"/forget-password",
	userValidator.forgetPassword,
	userController.forgetPassword,
	genericResponse.sendResponse
)

router.post(
	"/reset-password/:token",
	userValidator.resetPasswordTokenSchema,
	userValidator.resetPasswordSchema,
	userController.resetPasswordByToken,
	genericResponse.sendResponse
)

router.post(
	"/reset-user-password",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	userValidator.adminResetUserPasswordSchema,
	userController.adminResetPassword,
	genericResponse.sendResponse
)

router.post(
	"/subject",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	subjectValidator.subjectNameSchema,
	subjectController.createSubject,
	subjectSerializer.subjectNameId,
	genericResponse.sendResponse
)

router.get(
	"/subjects",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	subjectController.getAllSubject,
	subjectSerializer.getAllSubject,
	genericResponse.sendResponse
)

router.delete(
	"/subject/:subjectId",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	subjectValidator.subjectIdSchema,
	subjectController.deleteSubject,
	genericResponse.sendResponse
)

router.patch(
	"/subject/:subjectId",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	subjectValidator.subjectIdSchema,
	subjectValidator.subjectNameSchema,
	subjectController.updateSubject,
	subjectSerializer.subjectNameId,
	genericResponse.sendResponse
)

router.post(
	"/reset-password",
	authMiddleware.checkAccessToken,
	userValidator.resetPasswordSchema,
	userController.resetPassword,
	genericResponse.sendResponse
)

module.exports = router
