const { Router } = require("express")
const controllers = require("../controllers")
const genericResponse = require("../helpers/common-function.helper")
const authMiddleware = require("../middlewares/auth")
const validator = require("../validators/index")
const serializer = require("../serializers")
const router = Router()

router.get(
	"/upcoming-exams",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyUser,
	controllers.examController.getAllUpcomingExam,
	genericResponse.sendResponse
)

router.post(
	"/start-exam/:examId",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyUser,
	validator.examValidator.examIdSchema,
	controllers.examController.startExam,
	serializer.examSerializer.examQuestionAnswer,
	genericResponse.sendResponse
)

router.post(
	"/submit-exam",
	authMiddleware.checkAccessToken,
	authMiddleware.verifyUser,
	validator.examValidator.submitExam,
	controllers.examController.submitExam,
	genericResponse.sendResponse
)

module.exports = router
