const models = require('../models');

const createSubject = async (payload) => {
    const subjectExist = await models.Subject.findOne({ where: { subjectName: payload.subjectName } });
    if (subjectExist) {
        throw new Error('subject already exist');
    }
    const subjectCreated = await models.Subject.create(payload);
    return {
        id: subjectCreated.id,
        subjectName: subjectCreated.subjectName
    }
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



const getAllSubject = async () => {
    const subjects = await models.Subject.findAll({
        attributes: { exclude: ['deletedAt', 'createdAt', 'updatedAt'] },
    });
    return subjects;
}

module.exports = {
    createSubject,
    deleteSubject,
    getAllSubject
}