/* eslint-disable no-unused-vars */
const moment = require('moment');
const { sequelize } = require('../models');
const { Op } = require('sequelize');
const models = require('../models');
const createExam = async (payload) => {
  const subjectExist = await models.Subject.findOne({
    where: { subject_name: payload.subjectName }
  });
  if (!subjectExist) {
    throw new Error('subject not found');
  }

  if (payload.examStartTime >= payload.examEndTime) {
    throw new Error('examEndTime must be greater than examStartTime');
  }

  const startTime = new String(payload.examStartTime).split(':');
  const endTime = new String(payload.examEndTime).split(':');
  const dateArray = new String(payload.examDate).split('-');

  const currentDate = moment().format('YYYY-MM-DD');
  console.log(startTime, 'bchd');
  console.log(endTime, 'cbeerbver');

  const currentTime = moment().format('HH:mm:ss');
  if (payload.examDate < currentDate) {
    throw new Error('please pick an upcoming date');
  } else if (
    payload.examDate == currentDate &&
    payload.examStartTime <= currentTime
  ) {
    console.log(currentTime);
    throw new Error('please pick valid time');
  }

  const start_time =
    dateArray[0] +
    '-' +
    dateArray[1] +
    '-' +
    dateArray[2] +
    ' ' +
    startTime[0] +
    ':' +
    startTime[1] +
    ':' +
    startTime[2];
  const end_time =
    dateArray[0] +
    '-' +
    dateArray[1] +
    '-' +
    dateArray[2] +
    ' ' +
    endTime[0] +
    ':' +
    endTime[1] +
    ':' +
    endTime[2];

  const start_date_time = Date.parse(start_time);
  const end_date_time = Date.parse(end_time);

  const examPayload = {
    subject_id: subjectExist.id,
    exam_start_time: start_date_time,
    exam_end_time: end_date_time,
    exam_date: payload.examDate,
    exam_passing_percentage: payload.examPassingPercentage
  };

  const examCreated = await models.Exam.create(examPayload);

  return {
    id: examCreated.id,
    subjectId: examCreated.subject_id,
    examStartTime: examCreated.exam_start_time,
    examEndTime: examCreated.exam_end_time,
    examDate: examCreated.exam_date
  };
};

const deleteExam = async (payload, params) => {
  const examId = params.examId;
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
};

// eslint-disable-next-line no-unused-vars
const getAllExam = async (payload) => {
  const exams = await models.Exam.findAll({
    attributes: { exclude: ['created_at', 'deleted_at', 'updated_at'] }
  });
  return exams;
};

// eslint-disable-next-line no-unused-vars
const getAllUpcomingExam = async (payload) => {
  const exams = await models.Exam.findAll({
    where: {
      exam_end_time: {
        [Op.gt]: new Date()
      }
    }
  });
  return exams;
};

const startExam = async (payload, user, params) => {
  const examId = params.examId;
  const userId = user.id;

  const examExist = await models.Exam.findOne({
    where: {
      id: examId
    }
  });

  if (!examExist) {
    throw new Error('exam not found');
  }

  const userExist = await models.User.findOne({
    where: {
      id: userId
    }
  });

  if (!userExist) {
    throw new Error('user not found');
  }

  const examUserMappingExist = await models.ExamUserMapping.findOne({
    where: {
      [Op.and]: [{ exam_id: examId }, { user_id: userId }]
    }
  });

  if (examUserMappingExist) {
    throw new Error('cannot attempt exam twice');
  }

  const currentTime = new Date();

  if (currentTime > examExist.exam_end_time) {
    throw new Error('exam finished');
  } else if (currentTime < examExist.dataValues.exam_start_time) {
    console.log();
    throw new Error('exam not started yet');
  }

  console.log('iwiwiyewvhiwvhcvh');

  const paperSet = await models.PaperSet.findAll({
    order: sequelize.random(),
    limit: 1,
    where: { subject_id: examExist.dataValues.subject_id }
  });

  const paperSetId = paperSet[0].dataValues.id;
  console.log(paperSetId, '---------<');

  const questionSets = await models.Question.findAll({
    where: { paper_set_id: paperSetId },
    include: [
      {
        model: models.Answer,
        as: 'answers',
        attributes: { exclude: ['is_correct'] }
      }
    ]
  });

  const userExamMappingCreated = await models.ExamUserMapping.create({
    exam_id: examId,
    user_id: userId,
    paper_set_id: paperSetId,
    total_questions: questionSets.length,
    start_time: new Date().toUTCString()
  });

  if (!userExamMappingCreated) {
    throw new Error('Somthing went wrong');
  }
  return questionSets;
};

// eslint-disable-next-line no-unused-vars
const submitExam = async (payload, user) => {
  const trans = await sequelize.transaction();
  try {
    const examId = payload.examId;
    const userId = user.id;
    const paperSetId = payload.paperSetId;

    console.log(examId, paperSetId, userId);

    const currentTime = new Date();

    const examExist = await models.Exam.findOne(
      {
        where: {
          id: examId
        }
      },
      { transaction: trans }
    );

    if (!examExist) {
      throw new Error('exam not found');
    }

    const userExist = await models.User.findOne(
      {
        where: {
          id: userId
        }
      },
      { transaction: trans }
    );

    if (!userExist) {
      throw new Error('user not found');
    }

    const paperSetExist = await models.PaperSet.findOne(
      {
        where: { id: paperSetId }
      },
      { transaction: trans }
    );

    if (!paperSetExist) {
      throw new Error('paperSet not found');
    }

    const examUserPaperMappingExist = await models.ExamUserMapping.findOne(
      {
        where: {
          [Op.and]: [
            { exam_id: examId },
            { user_id: userId },
            { paper_set_id: paperSetId }
          ]
        }
      },
      { transaction: trans }
    );

    if (!examUserPaperMappingExist) {
      throw new Error('Invalid paperSetId');
    }

    const examUserMappingExist = await models.ExamUserMapping.findOne(
      {
        where: {
          [Op.and]: [
            { exam_id: examId },
            { user_id: userId },
            { paper_set_id: paperSetId },
            {
              submit_time: {
                [Op.eq]: null
              }
            }
          ]
        },
        attributes: { include: ['id'] }
      },
      { transaction: trans }
    );

    if (!examUserMappingExist) {
      throw new Error('exam submitted');
    }
    const attempt_id = examUserMappingExist.dataValues.id;

    if (examExist.exam_end_time < currentTime) {
      const correctAnswers = await models.ExamUserResponse.count(
        {
          where: {
            [Op.and]: [
              { exam_user_attempt_id: attempt_id },
              { is_correct: true }
            ]
          }
        },
        { transaction: trans }
      );

      const questionsAttempted = await models.ExamUserResponse.count(
        {
          where: {
            exam_user_attempt_id: attempt_id
          }
        },
        { transaction: trans }
      );

      console.log(correctAnswers, questionsAttempted);

      const marksPerQuestion = paperSetExist.marks_per_question;
      const negativeMarksPerWrongAnswer =
        paperSetExist.negative_marks_per_question;

      let totalMarksObtained =
        marksPerQuestion * correctAnswers -
        (questionsAttempted - correctAnswers) * negativeMarksPerWrongAnswer;

      if (totalMarksObtained < 0) {
        totalMarksObtained = 0;
      }
      const passingPercentage = examExist.exam_passing_percentage;
      const totalQuestions = examUserMappingExist.total_questions;
      const percentageObtained =
        (totalMarksObtained / totalQuestions) * marksPerQuestion * 100;
      const studenResult =
        percentageObtained >= passingPercentage ? true : false;

      const updatedResult = await models.ExamUserMapping.update(
        {
          total_question_attempted: questionsAttempted,
          total_correct_answers: correctAnswers,
          total_marks_obtained: totalMarksObtained,
          submit_time: new Date(),
          result: studenResult
        },
        {
          where: {
            id: attempt_id
          }
        },
        { transaction: trans }
      );
      await trans.commit();
      return 'Response logged';
    }

    const userResponse = payload.response;
    console.log(userResponse);
    console.log(attempt_id);

    let questionsAttempted = userResponse.length;
    let correctAnswers = 0;

    for (let i = 0; i < userResponse.length; ++i) {
      const questionId = userResponse[i].questionId;
      const answerId = userResponse[i].answerId;

      const questionExist = await models.Question.findOne(
        {
          where: {
            [Op.and]: [{ id: questionId }, { paper_set_id: paperSetId }]
          },
          include: [
            {
              model: models.Answer,
              as: 'answers',
              where: {
                id: answerId
              }
            }
          ]
        },
        { transaction: trans }
      );

      if (questionExist == null) {
        questionsAttempted--;
        continue;
      }

      const correctAnswer = questionExist.answers[0].is_correct;
      if (correctAnswer) {
        correctAnswers++;
      }

      const alreadySubmitted = await models.ExamUserResponse.findOne(
        {
          where: {
            [Op.and]: [
              { exam_user_attempt_id: attempt_id },
              { question_id: questionId }
            ]
          }
        },
        { transaction: trans }
      );

      if (alreadySubmitted) {
        await models.ExamUserResponse.update(
          {
            answer_id: answerId,
            is_correct: correctAnswer
          },
          {
            where: {
              [Op.and]: [
                { exam_user_attempt_id: attempt_id },
                { question_id: questionId }
              ]
            }
          },
          { transaction: trans }
        );
      } else {
        await models.ExamUserResponse.create(
          {
            answer_id: answerId,
            is_correct: correctAnswer,
            exam_user_attempt_id: attempt_id,
            question_id: questionId
          },
          { transaction: trans }
        );
      }
    }

    const marksPerQuestion = paperSetExist.marks_per_question;
    const negativeMarksPerWrongAnswer =
      paperSetExist.negative_marks_per_question;
    let totalMarksObtained =
      marksPerQuestion * correctAnswers -
      (questionsAttempted - correctAnswers) * negativeMarksPerWrongAnswer;

    if (totalMarksObtained < 0) {
      totalMarksObtained = 0;
    }

    const passingPercentage = examExist.exam_passing_percentage;
    const totalQuestions = examUserMappingExist.total_questions;
    const percentageObtained =
      (totalMarksObtained / totalQuestions) * marksPerQuestion * 100;
    const studenResult = percentageObtained >= passingPercentage ? true : false;

    const updatedResult = await models.ExamUserMapping.update(
      {
        total_question_attempted: questionsAttempted,
        total_correct_answers: correctAnswers,
        total_marks_obtained: totalMarksObtained,
        submit_time: new Date(),
        result: studenResult
      },
      {
        where: {
          id: attempt_id
        }
      },
      { transaction: trans }
    );

    await trans.commit();

    return { data: 'Exam submitted successfully', error: null };
  } catch (error) {
    await trans.rollback();
    console.log(error.message);
    return { data: null, error: error.message };
  }
};

const logResponse = async (payload, user) => {
  const trans = await sequelize.transaction();
  try {
    const examId = payload.examId;
    const userId = user.id;
    const paperSetId = payload.paperSetId;
    const questionId = payload.questionId;
    const answerId = payload.answerId;

    console.log(examId, paperSetId, userId, questionId, answerId);

    const currentTime = new Date();

    const examExist = await models.Exam.findOne(
      {
        where: {
          id: examId
        }
      },
      { transaction: trans }
    );

    if (!examExist) {
      throw new Error('exam not found');
    }

    if (currentTime > examExist.exam_end_time) {
      throw new Error('Cannot submit after end time');
    }

    const userExist = await models.User.findOne(
      {
        where: {
          id: userId
        }
      },
      { transaction: trans }
    );

    if (!userExist) {
      throw new Error('user not found');
    }

    const paperSetExist = await models.PaperSet.findOne(
      {
        where: { id: paperSetId }
      },
      { transaction: trans }
    );

    if (!paperSetExist) {
      throw new Error('paperSet not found');
    }

    const examUserMappingExist = await models.ExamUserMapping.findOne(
      {
        where: {
          [Op.and]: [
            { exam_id: examId },
            { user_id: userId },
            { paper_set_id: paperSetId },
            {
              submit_time: {
                [Op.eq]: null
              }
            }
          ]
        },
        attributes: { include: ['id'] }
      },
      { transaction: trans }
    );

    if (!examUserMappingExist) {
      throw new Error('either exam not started or already submitted');
    }

    const attempt_id = examUserMappingExist.dataValues.id;

    const questionExist = await models.Question.findOne(
      {
        where: {
          [Op.and]: [{ id: questionId }, { paper_set_id: paperSetId }]
        },
        include: [
          {
            model: models.Answer,
            as: 'answers',
            where: {
              id: answerId
            }
          }
        ]
      },
      { transaction: trans }
    );

    if (questionExist == null) {
      throw new Error('Invalid input');
    }

    const correctAnswer = questionExist.answers[0].is_correct;

    const alreadySubmitted = await models.ExamUserResponse.findOne(
      {
        where: {
          [Op.and]: [
            { exam_user_attempt_id: attempt_id },
            { question_id: questionId }
          ]
        }
      },
      { transaction: trans }
    );

    if (alreadySubmitted) {
      await models.ExamUserResponse.update(
        {
          answer_id: answerId,
          is_correct: correctAnswer
        },
        {
          where: {
            [Op.and]: [
              { exam_user_attempt_id: attempt_id },
              { question_id: questionId }
            ]
          }
        },
        { transaction: trans }
      );
    } else {
      await models.ExamUserResponse.create(
        {
          answer_id: answerId,
          is_correct: correctAnswer,
          exam_user_attempt_id: attempt_id,
          question_id: questionId
        },
        { transaction: trans }
      );
    }

    await trans.commit();
    return { data: 'response logged successfully', error: null };
  } catch (error) {
    await trans.rollback();
    return { data: null, error: error.message };
  }
};

const examResult = async (payload, params) => {
  const examId = params.examId;
  const currentTime = new Date();

  const examExist = await models.Exam.findOne({
    where: {
      id: examId
    }
  });

  if (!examExist) {
    throw new Error('Exam not found');
  }

  if (currentTime <= examExist.exam_end_time) {
    throw new Error('cannot get result now');
  }

  const allResults = await models.ExamUserMapping.findAll({
    where: {
      exam_id: examId
    },
    attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] }
  });

  return allResults;
};

const publishResult = async (payload, params) => {
  const trans = await sequelize.transaction();
  try {
    const examId = params.examId;
    const currentTime = new Date();
    const examExist = await models.Exam.findOne(
      {
        where: {
          id: examId
        }
      },
      { transaction: trans }
    );

    if (!examExist) {
      throw new Error('exam not found');
    }

    if (currentTime <= examExist.exam_end_time) {
      throw new Error('cannot publish result now');
    }

    console.log('here');

    const resultPublished = await models.ExamUserMapping.update(
      {
        publish_result: true
      },
      {
        where: {
          [Op.and]: [{ exam_id: examId }, { result: { [Op.not]: null } }]
        }
      },
      { transaction: trans }
    );
    if (!resultPublished) {
      throw new Error('error in publishing result');
    }
    await trans.commit();
    return { data: 'results published successfully', error: null };
  } catch (error) {
    await trans.rollback();
    return { data: null, error: error.message };
  }
};

const checkResult = async (payload, user, params) => {
  const examId = params.examId;
  const userId = user.id;

  console.log(examId, userId);

  const isResultPublished = await models.ExamUserMapping.findOne({
    where: {
      [Op.and]: [
        { user_id: userId },
        { exam_id: examId },
        { publish_result: true }
      ]
    }
  });

  if (!isResultPublished) {
    throw new Error('results not published yet');
  }

  return isResultPublished;
};

const updateExam = async (payload, params) => {
  const examId = params.examId;

  const examExist = await models.Exam.findOne({
    where: {
      id: examId
    }
  });

  if (!examExist) {
    throw new Error('exam not found');
  }

  const subjectExist = await models.Subject.findOne({
    where: { subject_name: payload.subjectName }
  });
  if (!subjectExist) {
    throw new Error('subject not found');
  }

  if (payload.examStartTime >= payload.examEndTime) {
    throw new Error('examEndTime must be greater than examStartTime');
  }

  const startTime = new String(payload.examStartTime).split(':');
  const endTime = new String(payload.examEndTime).split(':');
  const dateArray = new String(payload.examDate).split('-');

  const currentDate = moment().format('YYYY-MM-DD');
  console.log(startTime, 'bchd');
  console.log(endTime, 'cbeerbver');

  const currentTime = moment().format('HH:mm:ss');
  if (payload.examDate < currentDate) {
    throw new Error('please pick an upcoming date');
  } else if (
    payload.examDate == currentDate &&
    payload.examStartTime <= currentTime
  ) {
    console.log(currentTime);
    throw new Error('please pick valid time');
  }

  const start_time =
    dateArray[0] +
    '-' +
    dateArray[1] +
    '-' +
    dateArray[2] +
    ' ' +
    startTime[0] +
    ':' +
    startTime[1] +
    ':' +
    startTime[2];
  const end_time =
    dateArray[0] +
    '-' +
    dateArray[1] +
    '-' +
    dateArray[2] +
    ' ' +
    endTime[0] +
    ':' +
    endTime[1] +
    ':' +
    endTime[2];

  const start_date_time = Date.parse(start_time);
  const end_date_time = Date.parse(end_time);

  const examPayload = {
    subject_id: subjectExist.id,
    exam_start_time: start_date_time,
    exam_end_time: end_date_time,
    exam_date: payload.examDate,
    exam_passing_percentage: payload.examPassingPercentage
  };

  const examCreated = await models.Exam.update(examPayload, {
    where: {
      id: examId
    }
  });

  return 'exam updated successfully';
};

module.exports = {
  createExam,
  deleteExam,
  getAllExam,
  getAllUpcomingExam,
  startExam,
  submitExam,
  logResponse,
  examResult,
  publishResult,
  checkResult,
  updateExam
};
