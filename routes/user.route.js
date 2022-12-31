const { Router } = require("express");
const controllers = require("../controllers");
const genericResponse = require("../helpers/common-function.helper");
const authMiddleware = require('../middlewares/auth');
const validator = require('../validators/index');
const router = Router();

router.get('/upcoming-exams',
    controllers.examController.getAllUpcomingExam,
    genericResponse.sendResponse
);



module.exports = router;