const models = require('../models');
const { sequelize } = require('../models');
const createQuestionAnswer = async (payload) => {

    const trans = await sequelize.transaction();
    try {
        const subjectExist = await models.Subject.findOne({
            where: { subjectName: payload.subjectName },
        }, { transaction: trans });

        if (!subjectExist) {
            throw new Error(" subject not found");
        }

        const questionExist = await models.Question.findOne({
            where: { questionDescription: payload.questionDescription }
        });

        if (questionExist) {
            throw new Error('Question already exist');
        }

        const questionCreated = await models.Question.create({
            questionDescription: payload.questionDescription,
            subjectId: subjectExist.dataValues.id
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
                answerDescription: answerDescription,
                isCorrect: isCorrect,
                questionId: questionCreated.dataValues.id
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
                    model: models.Answer
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
                where: { questionId: questionId }
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
        questionDescription: payload.questionDescription
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
        answerDescription: payload.answerDescription
    }, { where: { id: answerId } });

    return 'answer description update success';
}


module.exports = {

    createQuestionAnswer,
    getAllQuestionAnswer,
    createQuestionAnswers,
    updateQuestionDescription,
    updateAnswerDescription,
    getQuestionAnswerById
}