const { Router } = require("express");
const controllers = require("../controllers");
const genericResponse = require("../helpers/common-function.helper");
const authMiddleware = require('../middlewares/auth');
const validator = require('../validators/index');
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


router.post(
    '/subject',
    authMiddleware.checkAccessToken,
    authMiddleware.verifyAdmin,
    validator.subjectValidator.createSubjectSchema,
    controllers.subjectController.createSubject,
    genericResponse.sendResponse
);


router.get(
    '/subjects',
    authMiddleware.checkAccessToken,
    authMiddleware.verifyAdmin,
    controllers.subjectController.getAllSubject,
    genericResponse.sendResponse
);


router.delete(
    '/subject/:subjectId',
    authMiddleware.checkAccessToken,
    authMiddleware.verifyAdmin,
    validator.subjectValidator.subjectIdSchema,
    controllers.subjectController.deleteSubject,
    genericResponse.sendResponse
);

router.post(
    '/question-answer',
    authMiddleware.checkAccessToken,
    authMiddleware.verifyAdmin,
    validator.questionAnswerValidator.createQuestionAnswerSchema,
    controllers.questionAnswerController.createQuestionAnswer,
    genericResponse.sendResponse
);


// router.post(
//     '/question-answers',
//     authMiddleware.checkAccessToken,
//     authMiddleware.verifyAdmin,
//     controllers.questionAnswerController.createQuestionAnswers,
//     genericResponse.sendResponse
// );

router.get(
    '/question-answers',
    authMiddleware.checkAccessToken,
    authMiddleware.verifyAdmin,
    controllers.questionAnswerController.getAllQuestionAnswer,
    genericResponse.sendResponse
);

router.get(
    '/question-answer/:questionId',
    authMiddleware.checkAccessToken,
    authMiddleware.verifyAdmin,
    controllers.questionAnswerController.getQuestionAnswerById,
    genericResponse.sendResponse
);

router.patch(
    '/question/:questionId',
    authMiddleware.checkAccessToken,
    authMiddleware.verifyAdmin,
    controllers.questionAnswerController.updateQuestionDescription,
    genericResponse.sendResponse
);



router.patch(
    '/answer/:answerId',
    authMiddleware.checkAccessToken,
    authMiddleware.verifyAdmin,
    controllers.questionAnswerController.updateAnswerDescription,
    genericResponse.sendResponse
);


router.post(
    '/paper-set',
    authMiddleware.checkAccessToken,
    authMiddleware.verifyAdmin,
    validator.paperSetValidator.createPaperSetSchema,
    controllers.paperSetController.createPaperSet,
    genericResponse.sendResponse
);



router.get(
    '/paper-sets',
    authMiddleware.checkAccessToken,
    authMiddleware.verifyAdmin,
    controllers.paperSetController.getAllPaperSet,
    genericResponse.sendResponse
);

router.delete(
    '/paper-set/:paperSetId',
    authMiddleware.checkAccessToken,
    authMiddleware.verifyAdmin,
    validator.paperSetValidator.paperSetIdSchema,
    controllers.paperSetController.deletePaperSet,
    genericResponse.sendResponse
);

router.get(
    '/paper-set-questions/:paperSetId',
    authMiddleware.checkAccessToken,
    authMiddleware.verifyAdmin,
    controllers.paperSetController.getAllPaperSetQuestions,
    genericResponse.sendResponse
)




module.exports = router;