const path = require("path");
const { DataTypes } = require("sequelize");
const sequelize = require(path.join(process.cwd(), "src/config/db/sequelize"));

const EmailVerifyOtp = sequelize.define(
  "emailverifyotp",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    created_by: {
      type: DataTypes.BIGINT.UNSIGNED,
    },
    otp_code: {
      type: DataTypes.STRING,
    },
    expire_date: {
      type: DataTypes.DATE,
    },
    email: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "emailverifyotp",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = EmailVerifyOtp;
