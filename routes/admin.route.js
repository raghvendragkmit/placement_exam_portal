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



module.exports = router;