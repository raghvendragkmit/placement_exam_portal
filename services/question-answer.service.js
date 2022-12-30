const models = require('../models');
const { sequelize } = require('../models');
const { Op } = require("sequelize");
const { commonErrorHandler } = require('../helpers/common-function.helper');
const createQuestionAnswer = async (payload) => {

    const trans = await sequelize.transaction();
    try {

        const paperSetExist = await models.PaperSet.findOne({
            where: { paper_set_name: payload.paperSetName },
        }, { transaction: trans });

        if (!paperSetExist) {
            throw new Error(" paperSet not found");
        }

        const questionExist = await models.Question.findOne({
            where: {
                [Op.and]: [
                    { question_description: payload.questionDescription },
                    { paper_set_id: paperSetExist.dataValues.id }
                ]
            }
        });

        if (questionExist) {
            throw new Error('Question already exist in paperSet');
        }

        const questionCreated = await models.Question.create({
            question_description: payload.questionDescription,
            paper_set_id: paperSetExist.dataValues.id
        },
            { transaction: trans }
        );

        if (!questionCreated) {
            throw new Error('question not created');
        }

        const answerOptions = payload.options;
        for (let i = 0; i < answerOptions.length; ++i) {
            const answerDescription = answerOptions[i].answerDescription;
            const isCorrect = answerOptions[i].isCorrect;

            const answerCreated = await models.Answer.create({
                answer_description: answerDescription,
                is_correct: isCorrect,
                question_id: questionCreated.dataValues.id
            }, { transaction: trans });

            if (!answerCreated) {
                throw new Error('something went wrong');
            }
        }

        await trans.commit();
        return { data: 'Question answer created successfully ', error: null };
    } catch (error) {
        await trans.rollback();
        return { data: null, error: error };
    }
}



const createQuestionAnswers = async (payload) => {
    const responseObject = [];
    for (var key in payload) {
        if (payload.hasOwnProperty(key)) {
            item = payload[key];
            const response = await createQuestionAnswer(item);
            if (response.error)
                throw new Error(response.error.message);
            responseObject.push(item.questionDescription);
        }
    }
    responseObject.push('Questions answers added successfully');
    return responseObject
}


const getAllQuestionAnswer = async (payload) => {
    const trans = await sequelize.transaction();
    try {
        const questions = await models.Question.findAll(
            {
                include: [{
                    model: models.Answer,
                    as: 'answers'
                }]
            },
            { transaction: trans });

        await trans.commit();
        return { data: questions, error: null };
    } catch (error) {
        await trans.rollback();
        return { data: null, error: error };
    }
}



const getQuestionAnswerById = async (payload, params) => {
    const questionId = params.questionId;
    console.log()
    const questionAnswer = await models.Question.findOne(
        {
            include: [{
                model: models.Answer,
                as: 'answers',
                where: { question_id: questionId }
            }]
        },
        {
            where: { id: questionId }
        });

    if (!questionAnswer) {
        throw new Error('question not found');
    }
    return questionAnswer;

}


const updateQuestionDescription = async (payload, params) => {
    const questionId = params.questionId;
    const questionExist = await models.Question.findOne({ where: { id: questionId } });
    if (!questionExist) {
        throw new Error('question not found');
    }
    const questionUpdated = await models.Question.update({
        question_description: payload.questionDescription
    }, { where: { id: questionId } });

    return 'question description update success';
}





const updateAnswerDescription = async (payload, params) => {
    const answerId = params.answerId;
    const answerExist = await models.Answer.findOne({ where: { id: answerId } });
    if (!answerExist) {
        throw new Error('answer not found');
    }
    const answerUpdated = await models.Answer.update({
        answer_description: payload.answerDescription
    }, { where: { id: answerId } });

    return 'answer description update success';
};




const deleteAnswerById = async (payload, params) => {
    const trans = await sequelize.transaction();
    try {
        const answerId = params.answerId;
        const answerExist = await models.Answer.findOne({ where: { id: answerId } }, { transaction: trans });
        if (!answerExist) {
            throw new Error('answer not found');
        }
        await models.Answer.destroy({ where: { id: answerId } }, { transaction: trans });
        await trans.commit();
        return { data: 'asnwer deleted successfully', error: null };
    } catch (error) {
        await trans.rollback();
        return { data: null, error: error.message };
    }
}


const deleteQuestionById = async (payload, params) => {
    const trans = await sequelize.transaction();
    try {
        const questionId = params.questionId;
        const questionExist = await models.Question.findOne({ where: { id: questionId } }, { transaction: trans });
        if (!questionExist) {
            throw new Error('question not found');
        }
        await models.Question.destroy({ where: { id: questionId } }, { transaction: trans });
        await models.Answer.destroy({ where: { question_id: questionId } }, { transaction: trans });
        await trans.commit();
        return { data: 'question asnwer deleted successfully', error: null };
    } catch (error) {
        await trans.rollback();
        return { data: null, error: error.message };
    }
}


module.exports = {

    createQuestionAnswer,
    getAllQuestionAnswer,
    createQuestionAnswers,
    updateQuestionDescription,
    updateAnswerDescription,
    deleteQuestionById,
    deleteAnswerById
}