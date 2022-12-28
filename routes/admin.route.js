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


router.post('/login',
    controllers.userController.loginUser,
    genericResponse.sendResponse
);


router.patch(
    '/user/:userId',
    authMiddleware.checkAccessToken,
    authMiddleware.verifyAdmin,
    controllers.userController.updateUser,
    genericResponse.sendResponse
);


router.delete(
    '/user/:userId',
    authMiddleware.checkAccessToken,
    authMiddleware.verifyAdmin,
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


router.post(
    '/subject',
    authMiddleware.checkAccessToken,
    authMiddleware.verifyAdmin,
    controllers.subjectController.createSubject,
    genericResponse.sendResponse
);



router.delete(
    '/subject/:subjectId',
    authMiddleware.checkAccessToken,
    authMiddleware.verifyAdmin,
    controllers.subjectController.deleteSubject,
    genericResponse.sendResponse
);



router.get(
    '/subjects',
    authMiddleware.checkAccessToken,
    authMiddleware.verifyAdmin,
    controllers.subjectController.getAllSubject,
    genericResponse.sendResponse
);


router.post(
    '/question',
    authMiddleware.checkAccessToken,
    authMiddleware.verifyAdmin,
    controllers.questionController.createQuestionAnswer,
    genericResponse.sendResponse
);


router.get(
    '/questions',
    authMiddleware.checkAccessToken,
    authMiddleware.verifyAdmin,
    controllers.questionController.getAllQuestionAnswer,
    genericResponse.sendResponse
);



router.post(
    '/paper-set',
    authMiddleware.checkAccessToken,
    authMiddleware.verifyAdmin,
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
    controllers.paperSetController.deletePaperSet,
    genericResponse.sendResponse
);
module.exports = router;