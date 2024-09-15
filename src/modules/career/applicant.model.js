const path = require("path");
const { DataTypes } = require("sequelize");
const sequelize = require(path.join(process.cwd(), "src/config/db/sequelize"));

const Applicant = sequelize.define(
    "applicants",
    {
		id: {
			type: DataTypes.BIGINT.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		position_id: { 
			type: DataTypes.BIGINT.UNSIGNED,
		},
		nationality: { 
			type: DataTypes.STRING,
		},
		first_name: { 
			type: DataTypes.STRING,
		},
		last_name: { 
			type: DataTypes.STRING,
		},
		mother_name: { 
			type: DataTypes.STRING,
		},
		father_name: {
			type: DataTypes.STRING,
		},
		religion: { 
			type: DataTypes.STRING,
		},
		martialstatus: { 
			type: DataTypes.STRING,
		},
		emirates_expiry: { 
			type: DataTypes.DATE,
		},
		country: {
			type: DataTypes.STRING,
		},
		province: { 
			type: DataTypes.STRING,
		},
		city: { 
			type: DataTypes.STRING,
		},
		policeStation: { 
			type: DataTypes.STRING,
		},
		zip: { 
			type: DataTypes.STRING,
		},
		homeaddrss: { 
			type: DataTypes.STRING,
		},
		nid_cnic_front: { 
			type: DataTypes.STRING,
		},
		nid_cnic_back: { 
			type: DataTypes.STRING,
		},
		uaeresident: { 
			type: DataTypes.STRING,
		},
		emiratesid: { 
			type: DataTypes.STRING,
		},
		date_of_birth: { 
			type: DataTypes.DATE,
		},
		contact_number: {
			type: DataTypes.STRING,
		},
		whatsapp_number: { 
			type: DataTypes.STRING,
		},
		email: { 
			type: DataTypes.STRING,
		},
		applicant_image: { 
			type: DataTypes.STRING,
		},
		applicant_passport: { 
			type: DataTypes.STRING,
		},
		passportno: { 
			type: DataTypes.STRING,
		},
		date_of_expiry: {
			type: DataTypes.DATE,
		},
		applicant_resume: {
			type: DataTypes.STRING,
		},
		appli_dri_number: {
			type: DataTypes.STRING,
		},
		appli_dri_expiry: {
			type: DataTypes.DATE,
		},
		appli_dri_lisence_frontpart: {
			type: DataTypes.STRING,
		},
		appli_dri_lisence_backpart: {
			type: DataTypes.STRING,
		},
		specialpage: {
			type: DataTypes.STRING,
		},
		submissionid: {
			type: DataTypes.STRING,
		},
		otp: {
			type: DataTypes.STRING,
		},
		otp_verified: {
			type: DataTypes.TINYINT,
			defaultValue: 0,
		},
		otp_generated_at: {
			type: DataTypes.DATE,
		},
		applicant_status: {
			type: DataTypes.ENUM('new_entry', 'checked', 'editted', 'invited', 'accepted', 'rejected', 'under_review', 'shortlisted', 'pending', 'offer_extended', 'offer_accepted', 'offer_declined', 'reschedule_requested', 'called', 'hired'),
			defaultValue: 'new_entry',
		},
		viewed: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		reference: {
			type: DataTypes.STRING,
		},
		nidorcnicnumber: {
			type: DataTypes.STRING,
		},
		nidorcnicexpiry: {
			type: DataTypes.STRING,
		},
		balance: {
			type: DataTypes.DECIMAL(8, 2),
		},
		have_uae_licence: {
			type: DataTypes.STRING,
		},
		UAE_Resident_Visa_No: {
			type: DataTypes.STRING,
		},
		UAE_License_No: {
			type: DataTypes.STRING,
		},
		SIM_No: {
			type: DataTypes.STRING,
		},
		UAE_DL_Front: {
			type: DataTypes.STRING,
		},
		UAE_DL_Back: {
			type: DataTypes.STRING,
		},	 
	},
	{
		tableName: "applicants",
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
);

module.exports = Applicant;