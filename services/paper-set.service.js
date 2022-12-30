const models = require('../models');
const { sequelize } = require('../models');
const { snakeCaseToCamelCase } = require('../helpers/common-function.helper');

const createPaperSet = async (payload) => {

    const subjectExist = await models.Subject.findOne({ where: { subject_name: payload.subject_name } });
    if (!subjectExist) {
        throw new Error('subject not found');
    }
    const paperSetCreated = await models.PaperSet.create({ subject_id: subjectExist.dataValues.id });


    return {
        id: paperSetCreated.id,
        subject_id: paperSetCreated.subject_id
    }
}

const deletePaperSet = async (payload, params) => {
    const paperSetId = params.paperSetId;
    const paperSetExist = await models.PaperSet.findOne({ where: { id: paperSetId } });
    if (!paperSetExist) {
        throw new Error('paperSet not found');
    }
    await models.PaperSet.destroy({ where: { id: paperSetId } });
    return 'PaperSet deleted successfully';
}


const getAllPaperSet = async () => {
    const paperSets = await models.PaperSet.findAll({
        include: [{
            model: models.Subject,
            as: 'subjects',
            attributes: ["id", "subject_name"]
        }],
        attributes: { exclude: ["created_at", "updated_at", "deleted_at", 'subject_id'] }
    });
    return paperSets;
}




const getAllPaperSetQuestions = async (payload, params) => {
    const paperSetId = params.paperSetId;
    const paperSets = await models.Question.findAll({
        where: { paper_set_id: paperSetId },
        include: [
            {
                model: models.Answer,
                as: 'answers'
            }
        ]
    });
    return paperSets;
}


module.exports = {
    createPaperSet,
    getAllPaperSet,
    deletePaperSet,
    getAllPaperSetQuestions
}
