const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateRandom } = require('../helpers/common-function.helper');
const { sendMail } = require('../helpers/mailer.helper');
const redisClient = require("../helpers/redis.helper");

const createUser = async (payload) => {
    const userExist = await models.User.findOne({ where: { email: payload.email } });
    if (userExist) {
        throw new Error('user already exist');
    }

    const userEmail = payload.email;
    const userPassword = payload.password;
    payload.password = await bcrypt.hash(payload.password, 10);

    const userPayload = {
        first_name: payload.firstName,
        last_name: payload.lastName,
        email: payload.email,
        password: payload.password,
        contact_number: payload.contactNumber,
        role: payload.role,
        organization: payload.organization
    }

    const userCreated = await models.User.create(userPayload);

    const mailBody = `Login Credentails \nemail: ${userEmail}\npassword: ${userPassword}`;
    await sendMail(mailBody, 'User login credentials', userEmail);


    return {
        id: userCreated.id,
        firstName: userCreated.first_name,
        lastName: userCreated.last_name,
        email: userCreated.email,
        role: userCreated.role,
        organization: userCreated.organization,
        contactNumber: userCreated.contactNumber,
    };
}

const loginUser = async (payload) => {
    const { email, password } = payload;

    console.log(payload);

    const user = await models.User.findOne({
        where: {
            email: email
        }
    });
    console.log(user);

    let key = user.dataValues.id + "-refresh-token";
    let refreshToken = await redisClient.get(key);
    if (!refreshToken) {
        const match = await bcrypt.compare(password, user.dataValues.password);
        if (!match) {
            throw new Error("Wrong email or password");
        }
        refreshToken = jwt.sign(
            { userId: user.dataValues.id },
            process.env.SECRET_KEY_REFRESH,
            {
                expiresIn: process.env.JWT_REFRESH_EXPIRATION,
            }
        );
    }

    const accessToken = jwt.sign(
        { userId: user.dataValues.id },
        process.env.SECRET_KEY_ACCESS,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRATION,
        }
    );

    await redisClient.set(key, refreshToken, 60 * 24);

    return {
        id: user.id,
        email: user.email,
        accessToken: accessToken,
        refreshToken: refreshToken,
    }
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


const getAllUser = async () => {
    const users = await models.User.findAll({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'] },
    });
    return users;
}


const refreshToken = async (payload) => {

    const { userId, token: refreshToken } = payload

    let newAccessToken = jwt.sign(
        { userId: userId },
        process.env.SECRET_KEY_ACCESS,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRATION,
        }
    );

    return {
        accessToken: newAccessToken,
        refreshToken,
    };
}


const forgetPassword = async (payload) => {
    const { email } = payload;
    const user = await models.User.findOne({
        where: {
            email: email,
        },
    });

    if (!user) {
        throw new Error("User Not Found!");
    }

    let randomToken = generateRandom(32, true);
    let resetPassawordLink = `${process.env.BASE_URL}/api/user/reset-password/${randomToken}`;
    let key = randomToken + "-reset-password-link";
    await redisClient.set(key, user.dataValues.id, 20);

    let recipient = email;
    let subject = "Reset Password Link";
    let body = `Password Reset Link:- ${resetPassawordLink}`;

    await sendMail(body, subject, recipient);
    return "send reset password link successfully";
};

const resetPassword = async (payload, params) => {
    const resetToken = params.token;
    const password = payload.password;
    let key = resetToken + "-reset-password-link";
    const cachedUserId = await redisClient.get(key);
    if (!cachedUserId) {
        throw new Error("Invalid Reset Link");
    }

    const userExist = await models.User.findOne({ where: { id: cachedUserId } });
    if (!userExist) {
        throw new Error("User Not Found");
    }
    await redisClient.del(key);

    await models.User.update(
        { password: await bcrypt.hash(password, 10) },
        { where: { email: userExist.dataValues.email } }
    );
    const email_body = `Password reset successfull`;
    const email_subject = `Password reset`;
    await sendMail(email_body, email_subject, userExist.dataValues.email);
    return "Password reset successfully";
};


module.exports = {
    createUser,
    loginUser,
    deleteUser,
    getAllUser,
    refreshToken,
    resetPassword,
    forgetPassword
}