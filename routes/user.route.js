const { Router } = require("express")
const examController = require("../controllers/exam.controller")
const genericResponse = require("../helpers/common-function.helper")
const authMiddleware = require("../middlewares/auth")
const examValidator = require("../validators/exam.validator")
const examSerializer = require("../serializers/exam.serializer")
const router = Router()

router.get(
	"/upcoming-exams",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyUser,
	examController.getAllUpcomingExam,
	genericResponse.sendResponse
)

router.post(
	"/start-exam/:examId",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyUser,
	examValidator.examIdSchema,
	examController.startExam,
	examSerializer.examQuestionAnswer,
	genericResponse.sendResponse
)

router.post(
	"/submit-exam",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyUser,
	examValidator.submitExam,
	examController.submitExam,
	genericResponse.sendResponse
)


router.get(
	"/exam-result/:examId",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyUser,
	examValidator.examIdSchema,
    examController.checkResult,
    examSerializer.userResult,
	genericResponse.sendResponse
)

module.exports = router
