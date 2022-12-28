const models = require('../models');
const { sequelize } = require('../models');

const createPaperSet = async (payload) => {

    const subjectExist = await models.Subject.findOne({ where: { subjectName: payload.subjectName } });
    if (!subjectExist) {
        throw new Error('subject not found');
    }
    const paperSetCreated = await models.PaperSet.create({ subjectId: subjectExist.dataValues.id });
    return paperSetCreated;
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
            attributes: ["id", "subjectName"]
        }],
        attributes: { exclude: ["created_at", "updated_at", "deleted_at", 'subject_id'] }
    });
    return paperSets;
}


module.exports = {
    createPaperSet,
    getAllPaperSet,
    deletePaperSet
}