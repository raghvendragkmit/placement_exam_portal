const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createUser = async (payload) => {

    const userExist = await models.User.findOne({ where: { email: payload.email } });
    if (userExist) {
        throw new Error('user already exist');
    }

    payload.password = await bcrypt.hash(payload.password, 10);

    console.log(payload);
    const userCreated = await models.User.create(payload);
    console.log(userCreated);
    return userCreated;
}


module.exports = {
    createUser,
    
}