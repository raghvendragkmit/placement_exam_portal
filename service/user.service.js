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

const loginUser = async (payload) => {
    const { email, password } = payload;

    console.log(payload);

    const user = await models.User.findOne({
        where: {
            email: email
        }
    });

    if (!user) {
        throw new Error('User Not Found!');
    }

    const match = await bcrypt.compare(password, user.dataValues.password);
    if (!match) {
        throw new Error('Wrong credentials');
    }

    const accessToken = jwt.sign({ userId: user.dataValues.id }, process.env.SECRET_KEY_ACCESS,
    );
    const refreshToken = jwt.sign({ userId: user.dataValues.id }, process.env.SECRET_KEY_REFRESH,
    );

    delete user.dataValues.password;

    return {
        id: user.id,
        email: user.email,
        accessToken: accessToken,
        refreshToken: refreshToken,
    }
}


const updateUser = async (payload, params) => {
    const userId = params.userId;
    const userExist = await models.User.findOne({ where: { id: userId } });
    if (!userExist) {
        throw new Error('user not found');
    }
    const updatedUser = await models.User.update(payload, { where: { id: userId } });
    const user = await models.User.findOne({ where: { id: userId } });
    return user;
}



const deleteUser = async (payload, params) => {
    const userId = params.userId;
    const userExist = await models.User.findOne({ where: { id: userId } });
    if (!userExist) {
        throw new Error('user not found');
    }
    await models.User.destroy({ where: { id: userId } });
    return 'user deleted successfully';
}



module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser
}