const path = require("path");
const { DataTypes } = require("sequelize");
const sequelize = require(path.join(process.cwd(), "src/config/db/sequelize"));

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    date_of_birth: {
      type: DataTypes.DATE,
    },
    email: {
      type: DataTypes.STRING,
    },
    email_verify_status: {
      type: DataTypes.ENUM("verified", "unverified"),
      defaultValue: "unverified",
    },
    password: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    nationality: {
      type: DataTypes.STRING,
    },
    passport_no: {
      type: DataTypes.STRING,
    },
    passport_expiry_date: {
      type: DataTypes.DATE,
    },
    father_name: {
      type: DataTypes.STRING,
    },
    mother_name: {
      type: DataTypes.STRING,
    },
    alt_phone: {
      type: DataTypes.STRING,
    },
    facebook_id: {
      type: DataTypes.STRING,
    },
    whatsapp_no: {
      type: DataTypes.STRING,
    },
    telegram_id: {
      type: DataTypes.STRING,
    },
    marital_status: {
      type: DataTypes.ENUM("married", "single", "divorced"),
    },
    spouse: {
      type: DataTypes.STRING,
    },
    spouse_contact_no: {
      type: DataTypes.STRING,
    },
    nid_number: {
      type: DataTypes.STRING,
    },
    uae_resident: {
      type: DataTypes.BOOLEAN,
    },
    emirates_id: {
      type: DataTypes.STRING,
    },
    emirates_expiry_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    country: {
      type: DataTypes.STRING,
    },

    home_address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    police_station: {
      type: DataTypes.STRING,
    },
    zip: {
      type: DataTypes.STRING,
    },
    position_id: {
      type: DataTypes.BIGINT.UNSIGNED,
    },
    department: {
      type: DataTypes.STRING,
    },
    reference_name: {
      type: DataTypes.STRING,
    },
    passport_front_page: {
      type: DataTypes.STRING,
    },
    passport_special_page: {
      type: DataTypes.STRING,
    },
    nid_front_page: {
      type: DataTypes.STRING,
    },
    nid_back_page: {
      type: DataTypes.STRING,
    },
    profile_image: {
      type: DataTypes.STRING,
    },
    resident_visa: {
      type: DataTypes.STRING,
    },
    business_license_copy: {
      type: DataTypes.STRING,
    },
    is_agree: {
      type: DataTypes.BOOLEAN,
    },
    role: {
      type: DataTypes.ENUM(
        "super_admin",
        "group_admin",
        "admin",
        "supervisor",
        "manager",
        "checker",
        "operator",
        "user"
      ),
      defaultValue: "user",
    },
    registration_type: {
      type: DataTypes.ENUM("agent", "employee"),
      defaultValue: "employee",
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = User;
