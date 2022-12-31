const moment = require('moment');
const { sequelize } = require('../models');
const { Op } = require("sequelize");
const models = require('../models');
const createExam = async (payload) => {
    const subjectExist = await models.Subject.findOne({ where: { subject_name: payload.subjectName } });
    if (!subjectExist) {
        throw new Error('subject not found');
    }

    if (payload.examStartTime >= payload.examEndTime) {
        throw new Error('examEndTime must be greater than examStartTime');
    }

    const startTime = new String(payload.examStartTime).split(":");
    const endTime = new String(payload.examEndTime).split(":");
    const dateArray = new String(payload.examDate).split('-');


    const currentDate = moment().format("YYYY-MM-DD");
    console.log(startTime, 'bchd');
    console.log(endTime, 'cbeerbver');


    const currentTime = moment().format("HH:mm:ss");
    if (payload.examDate < currentDate) {
        throw new Error('please pick an upcoming date');
    } else if (payload.examDate == currentDate && payload.examStartTime <= currentTime) {
        console.log(currentTime);
        throw new Error('please pick valid time');
    }

    const start_time = dateArray[0] + '-' + dateArray[1] + '-' + dateArray[2] + ' ' + startTime[0] + ':' + startTime[1] + ':' + startTime[2];
    const end_time = dateArray[0] + '-' + dateArray[1] + '-' + dateArray[2] + ' ' + endTime[0] + ':' + endTime[1] + ':' + endTime[2];

    const start_date_time = Date.parse(start_time);
    const end_date_time = Date.parse(end_time);

    const examPayload = {
        subject_id: subjectExist.id,
        exam_start_time: start_date_time,
        exam_end_time: end_date_time,
        exam_date: payload.examDate,
        exam_passing_percentage: payload.examPassingPercentage
    }

    const examCreated = await models.Exam.create(examPayload);

    return {
        id: examCreated.id,
        subjectId: examCreated.subject_id,
        examStartTime: examCreated.exam_start_time,
        examEndTime: examCreated.exam_end_time,
        examDate: examCreated.exam_date
    }
}

const deleteExam = async (payload, params) => {
    const examId = params.examId
    const currentTime = new Date();
    const examUserMappingExist = await models.Exam.findOne({
        where: {
            id: examId
        }
    });
    if (currentTime > examUserMappingExist.exam_start_time) {
        throw new Error('Cannot delete exam');
    }

    await models.Exam.destroy({ id: examId });
    return 'exam deleted successfully';
}

const getAllExam = async (payload) => {
    const exams = await models.Exam.findAll({
        attributes: { exclude: ["created_at", "deleted_at", "updated_at"] }
    });
    return exams;
}

const getAllUpcomingExam = async (payload) => {
    const exams = await models.Exam.findAll(
        {
            where: {
                exam_start_time: {
                    [Op.gt]: new Date(),
                }
            }
        }
    );
    return exams;
};


module.exports = {
    createExam,
    deleteExam,
    getAllExam
}