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


module.exports = {

    createQuestionAnswer
}