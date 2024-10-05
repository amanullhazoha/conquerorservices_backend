const path = require("path");
const { DataTypes } = require("sequelize");
const sequelize = require(path.join(process.cwd(), "src/config/db/sequelize"));

const EmailVerifyToken = sequelize.define(
  "emailVerifyTokens",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    created_by: {
      type: DataTypes.BIGINT.UNSIGNED,
    },
    expire_date: {
      type: DataTypes.DATE,
    },
    email: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "emailVerifyTokens",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = EmailVerifyToken;
