const models = require('../models');

const createSubject = async (payload) => {
    const subjectExist = await models.Subject.findOne({ where: { subjectName: payload.subjectName } });
    if (subjectExist) {
        throw new Error('user already exist');
    }
    const userCreated = await models.Subject.create(payload);
    return userCreated;
}


module.exports = {
    createSubject
}