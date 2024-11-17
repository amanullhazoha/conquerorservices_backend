const path = require("path");
const { DataTypes } = require("sequelize");
const sequelize = require(path.join(process.cwd(), "src/config/db/sequelize"));

const Interview = sequelize.define(
  "interviews",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    applicant_id: {
      type: DataTypes.BIGINT.UNSIGNED,
    },
    interview_method: {
      type: DataTypes.STRING,
    },
    time: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    post_office: {
      type: DataTypes.STRING,
    },
    police_station: {
      type: DataTypes.STRING,
    },
    required_document: {
      type: DataTypes.STRING,
    },
    contactnumber: {
      type: DataTypes.STRING,
    },
    meetingurl: {
      type: DataTypes.STRING,
    },
    zonecountry: {
      type: DataTypes.STRING,
    },
    scheduled_at: {
      type: DataTypes.STRING,
    },
    qrcode_path: {
      type: DataTypes.TEXT,
    },
    message: {
      type: DataTypes.TEXT,
    },
    meetingpass: {
      type: DataTypes.TEXT,
    },
    invitedby: {
      type: DataTypes.BIGINT,
    },
  },
  {
    tableName: "interviews",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Interview;
