const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_Name,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST_NAME,
        dialect: "mysql",
        logging: false,
        sync: true,
    },
);

module.exports = sequelize;
