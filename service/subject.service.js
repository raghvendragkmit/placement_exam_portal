const models = require('../models');

const createSubject = async (payload) => {
    const subjectExist = await models.Subject.findOne({ where: { subjectName: payload.subjectName } });
    if (subjectExist) {
        throw new Error('subject already exist');
    }
    const userCreated = await models.Subject.create(payload);
    return userCreated;
}

const deleteSubject = async (payload, params) => {
    const subjectId = params.subjectId
    const subjectExist = await models.Subject.findOne({ where: { id: subjectId } });
    if (!subjectExist) {
        throw new Error('subject not found');
    }
    await models.Subject.destroy({ where: { id: subjectId } });
    return 'subject deleted successfully';
}

module.exports = {
    createSubject,
    deleteSubject
}