const app = require('./app');
const { sequelize } = require('./models');
require('dotenv').config();
const startServer = async function () {
    try {
        await sequelize.authenticate();
        console.log('... db connected ✔');
        app.listen(process.env.SERVER_PORT);
        console.log(`--- Server started on ${process.env.SERVER_PORT} ---\n\n`);
    } catch (err) {
        console.log('server setup failed', err);
        console.log('Error: ', err.message);
    }
};

startServer();