const { Router } = require("express")
const controllers = require("../controllers")
const genericResponse = require("../helpers/common-function.helper")
const authMiddleware = require("../middlewares/auth")
const validator = require("../validators/index")
const serializer = require("../serializers")
const router = Router()

router.post(
	"/question-answer",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	validator.questionAnswerValidator.questionAnswerSchema,
	controllers.questionAnswerController.createQuestionAnswer,
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

router.post(
	"/exam",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	validator.examValidator.createExamSchema,
	controllers.examController.createExam,
	genericResponse.sendResponse
)

router.delete(
	"/exam/:examId",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	validator.examValidator.examIdSchema,
	controllers.examController.deleteExam,
	genericResponse.sendResponse
)

router.get(
	"/exams",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	controllers.examController.getAllExam,
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

router.delete(
	"/question-answer/:questionId",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	validator.questionAnswerValidator.questionIdSchema,
	controllers.questionAnswerController.deleteQuestionById,
	genericResponse.sendResponse
)

router.delete(
	"/answer/:answerId",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	validator.questionAnswerValidator.answerIdSchema,
	controllers.questionAnswerController.deleteAnswerById,
	genericResponse.sendResponse
)

router.patch(
	"/answer/:answerId",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	validator.questionAnswerValidator.answerIdSchema,
	validator.questionAnswerValidator.answerDescriptionSchema,
	controllers.questionAnswerController.updateAnswerDescription,
	genericResponse.sendResponse
)

router.post(
	"/paper-set",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	validator.paperSetValidator.createPaperSetSchema,
	controllers.paperSetController.createPaperSet,
	serializer.paperSetSerializer.createPaperSet,
	genericResponse.sendResponse
)

router.get(
	"/paper-sets",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	controllers.paperSetController.getAllPaperSet,
	serializer.paperSetSerializer.getALlPaperSet,
	genericResponse.sendResponse
)

router.patch(
	"/paper-set/:paperSetId",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	controllers.paperSetController.updatePaperSet,
	serializer.paperSetSerializer.paperSetNameId,
	genericResponse.sendResponse
)

router.delete(
	"/paper-set/:paperSetId",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	validator.paperSetValidator.paperSetIdSchema,
	controllers.paperSetController.deletePaperSet,
	genericResponse.sendResponse
)

router.get(
	"/paper-set-question-answers/:paperSetId",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	controllers.paperSetController.getAllPaperSetQuestions,
	serializer.paperSetSerializer.questionAnswers,
	genericResponse.sendResponse
)

router.patch(
	"/question/:questionId",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	validator.questionAnswerValidator.questionIdSchema,
	validator.questionAnswerValidator.questionDescriptionSchema,
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

router.get(
	"/exam-results/:examId",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	validator.examValidator.examIdSchema,
	controllers.examController.examResult,
	serializer.examSerializer.examResult,
	genericResponse.sendResponse
)

router.post(
	"/publish-exam-results/:examId",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyAdmin,
	validator.examValidator.examIdSchema,
	controllers.examController.publishResult,
	genericResponse.sendResponse
)

module.exports = router
