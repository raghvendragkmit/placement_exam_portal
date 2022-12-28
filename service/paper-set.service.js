const models = require('../models');
const { sequelize } = require('../models');

const createPaperSet = async (payload) => {

    const subjectExist = await models.Subject.findOne({ where: { subjectName: payload.subjectName } });
    if (!subjectExist) {
        throw new Error('subject not found');
    }
    const paperSetCreated = await models.PaperSet.create({subjectId:subjectExist.dataValues.id});
    return paperSetCreated;
}


module.exports = {
    createPaperSet
}