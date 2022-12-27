const jwt = require('jsonwebtoken');
const models = require('../models');
require('dotenv').config();
const checkAccessToken = async (req, res, next) => {
    try {
        const header = req.headers["authorization"];
        const token = (header ? header.split(' ')[1] : null);
        if (!token) {
            throw new Error('Access denied');
        }

        let decoded_jwt = jwt.verify(token, process.env.SECRET_KEY_ACCESS);
        console.log(decoded_jwt);
        const user = await models.User.findOne({
            where: {
                id: decoded_jwt.userId
            }
        });
        if (!user) {
            throw new Error('User Not found');
        }
        req.user = user.dataValues;
        next();
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
}


const verifyAdmin = async (req, res, next) => {
    try {
        console.log(req.user);
        if (req.user.role == 'admin') {
            next();
        }
        else {
            throw new Error('admin access required');
        }
    } catch (error) {
        return res.status(403).json({ error: error.message });

    }
}

module.exports = {
    checkAccessToken,
    verifyAdmin
};