const path = require("path");
const { DataTypes } = require("sequelize");
const sequelize = require(path.join(process.cwd(), "src/config/db/sequelize"));

const Applicant = sequelize.define(
    "applicants",
    {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.BIGINT,
		},
		position_id: {
			allowNull: false,
			type: DataTypes.BIGINT,
		},
        nationality: {
            allowNull: false,
			type: DataTypes.STRING,
        },
        first_name: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		last_name: {
			allowNull: true,
			type: DataTypes.STRING,
		},
        mother_name: {
			allowNull: true,
			type: DataTypes.STRING,
		},
        father_name: {
			allowNull: true,
			type: DataTypes.STRING,
		},
        religion: {
            allowNull: true,
			type: DataTypes.STRING,
        },
        martialstatus: {
            allowNull: true,
			type: DataTypes.STRING,
        },
		emirates_expiry: {
			allowNull: true,
			type: DataTypes.DATE,
		},
        country: {
            allowNull: true,
			type: DataTypes.STRING,
        },
        province: {
            allowNull: true,
			type: DataTypes.STRING,
        },
		city: {
			allowNull: true,
			type: DataTypes.DATE,
		},
        policeStation: {
            allowNull: true,
			type: DataTypes.STRING,
        },
        zip: {
            allowNull: true,
			type: DataTypes.STRING,
        },
		homeaddrss: {
			allowNull: true,
			type: DataTypes.DATE,
		},

        nid_cnic_front: {
			allowNull: true,
			type: DataTypes.DATE,
		},
        nid_cnic_back: {
            allowNull: true,
			type: DataTypes.STRING,
        },
        uaeresident: {
            allowNull: true,
			type: DataTypes.STRING,
        },
		emiratesid: {
			allowNull: true,
			type: DataTypes.DATE,
		},

        date_of_birth: {
			allowNull: true,
			type: DataTypes.DATE,
		},
        contact_number: {
            allowNull: true,
			type: DataTypes.STRING,
        },
        whatsapp_number: {
            allowNull: true,
			type: DataTypes.STRING,
        },
		email: {
			allowNull: true,
			type: DataTypes.DATE,
		},

        applicant_image: {
			allowNull: true,
			type: DataTypes.DATE,
		},
        applicant_passport: {
            allowNull: true,
			type: DataTypes.STRING,
        },
        passportno: {
            allowNull: true,
			type: DataTypes.STRING,
        },
		date_of_expiry: {
			allowNull: true,
			type: DataTypes.DATE,
		},


        applicant_resume: {
			allowNull: true,
			type: DataTypes.DATE,
		},
        appli_dri_number: {
            allowNull: true,
			type: DataTypes.STRING,
        },
        appli_dri_expiry: {
            allowNull: true,
			type: DataTypes.STRING,
        },
		appli_dri_lisence_frontpart: {
			allowNull: true,
			type: DataTypes.DATE,
		},

        appli_dri_lisence_backpart: {
			allowNull: true,
			type: DataTypes.DATE,
		},
        specialpage: {
            allowNull: true,
			type: DataTypes.STRING,
        },
        submissionid: {
            allowNull: true,
			type: DataTypes.STRING,
        },
		otp: {
			allowNull: true,
			type: DataTypes.DATE,
		},
        otp_verified: {
			allowNull: true,
			type: DataTypes.DATE,
		},
        otp_generated_at: {
			allowNull: true,
			type: DataTypes.DATE,
		},
        applicant_status: {
			allowNull: true,
			type: DataTypes.DATE,
		},
        viewed: {
			allowNull: true,
			type: DataTypes.DATE,
		},
        reference: {
			allowNull: true,
			type: DataTypes.DATE,
		},
        nidorcnicnumber: {
			allowNull: true,
			type: DataTypes.DATE,
		},
        nidorcnicexpiry: {
			allowNull: true,
			type: DataTypes.DATE,
		},
        balance: {
			allowNull: true,
			type: DataTypes.DATE,
		},
        have_uae_licence: {
			allowNull: true,
			type: DataTypes.DATE,
		},
        UAE_Resident_Visa_No: {
			allowNull: true,
			type: DataTypes.DATE,
		},
        UAE_License_No: {
			allowNull: true,
			type: DataTypes.DATE,
		},
        SIM_No: {
			allowNull: true,
			type: DataTypes.DATE,
		},
        UAE_DL_Front: {
			allowNull: true,
			type: DataTypes.DATE,
		},
        UAE_DL_Back: {
			allowNull: true,
			type: DataTypes.DATE,
		},

		// Table: applicants
		// Columns:
		// 	id bigint UN AI PK 
		// 	position_id bigint UN 
		// 	nationality varchar(255) 
		// 	first_name varchar(255) 
		// 	last_name varchar(255) 
		// 	mother_name varchar(255) 
		// 	father_name varchar(255) 
		// 	religion varchar(255) 
		// 	martialstatus varchar(255) 
		// 	emirates_expiry date 
		// 	country varchar(255) 
		// 	province varchar(255) 
		// 	city varchar(255) 
		// 	policeStation varchar(255) 
		// 	zip varchar(255) 
		// 	homeaddrss varchar(255) 
		// 	nid_cnic_front varchar(255) 
		// 	nid_cnic_back varchar(255) 
		// 	uaeresident varchar(255) 
		// 	emiratesid varchar(255) 
		// 	date_of_birth date 
		// 	contact_number varchar(255) 
		// 	whatsapp_number varchar(255) 
		// 	email varchar(255) 
		// 	applicant_image varchar(255) 
		// 	applicant_passport varchar(255) 
		// 	passportno varchar(255) 
		// 	date_of_expiry date 
		// 	applicant_resume varchar(255) 
		// 	appli_dri_number varchar(255) 
		// 	appli_dri_expiry date 
		// 	appli_dri_lisence_frontpart varchar(255) 
		// 	appli_dri_lisence_backpart varchar(255) 
		// 	specialpage varchar(255) 
		// 	submissionid varchar(255) 
		// 	otp varchar(255) 
		// 	otp_verified tinyint 
		// 	otp_generated_at timestamp 
		// 	applicant_status enum('new_entry','checked','editted','invited','accepted','rejected','under_review','shortlisted','pending','offer_extended','offer_accepted','offer_declined','reschedule_requested','called','hired') 
		// 	viewed tinyint(1) 
		// 	reference varchar(255) 
		// 	nidorcnicnumber varchar(255) 
		// 	nidorcnicexpiry varchar(255) 
		// 	balance decimal(8,2) 
		// 	have_uae_licence varchar(255) 
		// 	UAE_Resident_Visa_No varchar(255) 
		// 	UAE_License_No varchar(255) 
		// 	SIM_No varchar(255) 
		// 	UAE_DL_Front varchar(255) 
		// 	UAE_DL_Back varchar(255) 
		// 	created_at timestamp 
		// 	updated_at
	},
	{
		tableName: "applicants",
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at",
	}
);

module.exports = Applicant;