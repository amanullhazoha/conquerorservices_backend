const path = require("path");
const { Op } = require("sequelize");
const Applicant = require(path.join(
  process.cwd(),
  "src/modules/career/applicant.model"
));

const getAllJobApplicants = async (req, res, next) => {
  try {
    const searchQuery = req.query.search;
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    const offset = (page - 1) * size;

    if (searchQuery) {
      whereCondition = {
        [Op.or]: [
          { first_name: { [Op.like]: `%${searchQuery.toLowerCase()}%` } },
          { last_name: { [Op.like]: `%${searchQuery.toLowerCase()}%` } },
          { email: { [Op.like]: `%${searchQuery.toLowerCase()}%` } },
          { passportno: { [Op.like]: `%${searchQuery.toLowerCase()}%` } },
          { contact_number: { [Op.like]: `%${searchQuery.toLowerCase()}%` } },
        ],
      };
    }

    const { rows: applicants, count: totalRecords } =
      await Applicant.findAndCountAll({
        where: whereCondition,
        limit: size,
        offset: offset,
        raw: true,
        nest: true,
      });

    const totalPages = Math.ceil(totalRecords / size);

    return res.status(200).json({
      applicants,
      meta: {
        totalRecords,
        totalPages,
        currentPage: page,
        pageSize: size,
      },
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const getSecureJobApplicantById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const jobApplicant = await Applicant.findOne({ where: { id } });

    if (!jobApplicant) return res.status(404).send("Data not found by ID.");

    res.status(200).send(jobApplicant);
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const getJobApplicantId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const jobApplicant = await Applicant.findOne({ where: { id } });

    if (!jobApplicant) return res.status(404).send("Data not found by ID.");

    res.status(200).send(jobApplicant);
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const updateApplication = async (req, res, next) => {
  try {
    const id = req.params.id;

    let applicant_image;
    let nid_cnic_front;
    let nid_cnic_back;
    let applicant_passport;
    let applicant_resume;
    let UAE_DL_Front;
    let UAE_DL_Back;
    let appli_dri_lisence_frontpart;
    let appli_dri_lisence_backpart;

    if (req?.files?.applicant_image) {
      applicant_image = req?.files?.applicant_image[0]?.filename;
    } else {
      applicant_image = req?.body?.applicant_image;
    }

    if (req?.files?.nid_cnic_front) {
      nid_cnic_front = req?.files?.nid_cnic_front[0]?.filename;
    } else {
      nid_cnic_front = req?.body?.nid_cnic_front;
    }

    if (req?.files?.nid_cnic_back) {
      nid_cnic_back = req?.files?.nid_cnic_back[0]?.filename;
    } else {
      nid_cnic_back = req?.body?.nid_cnic_back;
    }

    if (req?.files?.applicant_passport) {
      applicant_passport = req?.files?.applicant_passport[0]?.filename;
    } else {
      applicant_passport = req?.body?.applicant_passport;
    }

    if (req?.files?.applicant_resume) {
      applicant_resume = req?.files?.applicant_resume[0]?.filename;
    } else {
      applicant_resume = req?.body?.applicant_resume;
    }

    if (req?.files?.UAE_DL_Front) {
      UAE_DL_Front = req?.files?.UAE_DL_Front[0]?.filename;
    } else {
      UAE_DL_Front = req?.body?.UAE_DL_Front;
    }

    if (req?.files?.UAE_DL_Back) {
      UAE_DL_Back = req?.files?.UAE_DL_Back[0]?.filename;
    } else {
      UAE_DL_Back = req?.body?.UAE_DL_Back;
    }

    if (req?.files?.appli_dri_lisence_frontpart) {
      appli_dri_lisence_frontpart =
        req?.files?.appli_dri_lisence_frontpart[0]?.filename;
    } else {
      appli_dri_lisence_frontpart = req?.body?.appli_dri_lisence_frontpart;
    }

    if (req?.files?.appli_dri_lisence_backpart) {
      appli_dri_lisence_backpart =
        req?.files?.appli_dri_lisence_backpart[0]?.filename;
    } else {
      appli_dri_lisence_backpart = req?.body?.appli_dri_lisence_backpart;
    }

    const {
      first_name,
      last_name,
      mother_name,
      gender,
      date_of_birth,
      nationality,
      email,
      contact_number,
      whatsapp_number,
      position_id,
      hiring_position,
      zip,
      city,
      religion,
      province,
      passportno,
      emiratesid,
      homeaddrss,
      uaeresident,
      father_name,
      policeStation,
      martialstatus,
      date_of_expiry,
      nidorcnicnumber,
      emirates_expiry,
      reference,
      spouse,
      is_agree,
      submissionid,
      appli_dri_number,
      appli_dri_expiry,
      have_uae_licence,
      UAE_Resident_Visa_No,
      UAE_License_No,
      SIM_No,
      ref1_name,
      ref1_email,
      ref1_phone,
      ref1_country,
      ref1_address,
      ref2_name,
      ref2_email,
      ref2_phone,
      ref2_country,
      ref2_address,
    } = req.body;

    const applicant = await Applicant.findOne({ where: { id } });

    if (!applicant) return res.status(404).send("Data not found by Id.");

    await applicant.update({
      first_name,
      last_name,
      mother_name,
      gender,
      date_of_birth,
      nationality,
      email,
      contact_number,
      whatsapp_number,
      position_id,
      applicant_image,
      hiring_position:
        position_id === "52" || position_id === 52 ? hiring_position : null,
      UAE_DL_Front:
        position_id === "52" || position_id === 52 ? null : UAE_DL_Front,
      UAE_DL_Back:
        position_id === "52" || position_id === 52 ? null : UAE_DL_Back,
      appli_dri_number:
        position_id === "52" || position_id === 52 ? null : appli_dri_number,
      appli_dri_expiry:
        position_id === "52" || position_id === 52 ? null : appli_dri_expiry,
      have_uae_licence:
        position_id === "52" || position_id === 52 ? null : have_uae_licence,
      UAE_License_No:
        position_id === "52" || position_id === 52 ? null : UAE_License_No,
      UAE_Resident_Visa_No:
        position_id === "52" || position_id === 52
          ? null
          : UAE_Resident_Visa_No,
      SIM_No: position_id === "52" || position_id === 52 ? null : SIM_No,
      appli_dri_lisence_frontpart:
        position_id === "52" || position_id === 52
          ? null
          : appli_dri_lisence_frontpart,
      appli_dri_lisence_backpart:
        position_id === "52" || position_id === 52
          ? null
          : appli_dri_lisence_backpart,
      ref1_name: position_id === "52" || position_id === 52 ? ref1_name : null,
      ref1_email:
        position_id === "52" || position_id === 52 ? ref1_email : null,
      ref1_phone:
        position_id === "52" || position_id === 52 ? ref1_phone : null,
      ref1_country:
        position_id === "52" || position_id === 52 ? ref1_country : null,
      ref1_address:
        position_id === "52" || position_id === 52 ? ref1_address : null,
      ref2_name: position_id === "52" || position_id === 52 ? ref2_name : null,
      ref2_email:
        position_id === "52" || position_id === 52 ? ref2_email : null,
      ref2_phone:
        position_id === "52" || position_id === 52 ? ref2_phone : null,
      ref2_country:
        position_id === "52" || position_id === 52 ? ref2_country : null,
      ref2_address:
        position_id === "52" || position_id === 52 ? ref2_address : null,
      zip,
      city,
      religion,
      province,
      passportno,
      homeaddrss,
      father_name,
      policeStation,
      martialstatus,
      date_of_expiry,
      reference,
      nid_cnic_front,
      nid_cnic_back,
      nidorcnicnumber,
      applicant_resume,
      applicant_passport,
      uaeresident,
      emiratesid: uaeresident === "no" ? null : emiratesid,
      emirates_expiry: uaeresident === "no" ? null : emirates_expiry,
      spouse: martialstatus === "married" ? spouse : null,
      is_agree,
      submissionid,
    });

    res.status(201).send(applicant);
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const createApplicantBasicInfo = async (req, res, next) => {
  try {
    let applicant_image;

    if (req?.files?.applicant_image) {
      applicant_image = req?.files?.applicant_image[0]?.filename;
    } else {
      applicant_image = req?.body?.applicant_image;
    }

    const {
      first_name,
      last_name,
      mother_name,
      gender,
      date_of_birth,
      nationality,
      email,
      contact_number,
      whatsapp_number,
      position_id,
      hiring_position,
    } = req.body;

    const applicant = await Applicant.create({
      first_name,
      last_name,
      mother_name,
      gender,
      date_of_birth,
      nationality,
      email,
      contact_number,
      whatsapp_number,
      position_id,
      applicant_image,
      hiring_position:
        position_id === "52" || position_id === 52 ? hiring_position : null,

      zip: "",
      city: "",
      country: "",
      province: "",
      religion: "",
      passportno: "",
      father_name: "",
      policeStation: "",
      martialstatus: "",
      nidorcnicnumber: "",
      date_of_expiry: null,
      applicant_passport: "",
    });

    res.status(201).send(applicant);
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const updateApplicantBasicInfo = async (req, res, next) => {
  try {
    const id = req.params.id;

    let applicant_image;

    if (req?.files?.applicant_image) {
      applicant_image = req?.files?.applicant_image[0]?.filename;
    } else {
      applicant_image = req?.body?.applicant_image;
    }

    const {
      first_name,
      last_name,
      mother_name,
      gender,
      date_of_birth,
      nationality,
      email,
      contact_number,
      whatsapp_number,
      position_id,
      hiring_position,
    } = req.body;

    const applicant = await Applicant.findOne({ where: { id } });

    if (!applicant) return res.status(404).send("Data not found by Id.");

    await applicant.update({
      first_name,
      last_name,
      mother_name,
      gender,
      date_of_birth,
      nationality,
      email,
      contact_number,
      whatsapp_number,
      position_id,
      applicant_image,
      hiring_position:
        position_id === "52" || position_id === 52 ? hiring_position : null,

      UAE_DL_Front:
        position_id === "52" || position_id === 52
          ? null
          : applicant.UAE_DL_Front,
      UAE_DL_Back:
        position_id === "52" || position_id === 52
          ? null
          : applicant.UAE_DL_Back,
      appli_dri_number:
        position_id === "52" || position_id === 52
          ? null
          : applicant.appli_dri_number,
      appli_dri_expiry:
        position_id === "52" || position_id === 52
          ? null
          : applicant.appli_dri_expiry,
      have_uae_licence:
        position_id === "52" || position_id === 52
          ? null
          : applicant.have_uae_licence,
      UAE_License_No:
        position_id === "52" || position_id === 52
          ? null
          : applicant.UAE_License_No,
      UAE_Resident_Visa_No:
        position_id === "52" || position_id === 52
          ? null
          : applicant.UAE_Resident_Visa_No,
      SIM_No:
        position_id === "52" || position_id === 52 ? null : applicant.SIM_No,
      appli_dri_lisence_frontpart:
        position_id === "52" || position_id === 52
          ? null
          : applicant.appli_dri_lisence_frontpart,
      appli_dri_lisence_backpart:
        position_id === "52" || position_id === 52
          ? null
          : applicant.appli_dri_lisence_backpart,
      ref1_name:
        position_id === "52" || position_id === 52
          ? applicant?.ref1_name
          : null,
      ref1_email:
        position_id === "52" || position_id === 52
          ? applicant?.ref1_email
          : null,
      ref1_phone:
        position_id === "52" || position_id === 52
          ? applicant?.ref1_phone
          : null,
      ref1_country:
        position_id === "52" || position_id === 52
          ? applicant?.ref1_country
          : null,
      ref1_address:
        position_id === "52" || position_id === 52
          ? applicant?.ref1_address
          : null,
      ref2_name:
        position_id === "52" || position_id === 52
          ? applicant?.ref2_name
          : null,
      ref2_email:
        position_id === "52" || position_id === 52
          ? applicant?.ref2_email
          : null,
      ref2_phone:
        position_id === "52" || position_id === 52
          ? applicant?.ref2_phone
          : null,
      ref2_country:
        position_id === "52" || position_id === 52
          ? applicant?.ref2_country
          : null,
      ref2_address:
        position_id === "52" || position_id === 52
          ? applicant?.ref2_address
          : null,
    });

    res.status(201).send(applicant);
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const updateApplicantNidOrCnicInfo = async (req, res, next) => {
  try {
    const id = req.params.id;

    let nid_cnic_front;
    let nid_cnic_back;
    let applicant_passport;
    let applicant_resume;

    if (req?.files?.nid_cnic_front) {
      nid_cnic_front = req?.files?.nid_cnic_front[0]?.filename;
    } else {
      nid_cnic_front = req?.body?.nid_cnic_front;
    }

    if (req?.files?.nid_cnic_back) {
      nid_cnic_back = req?.files?.nid_cnic_back[0]?.filename;
    } else {
      nid_cnic_back = req?.body?.nid_cnic_back;
    }

    if (req?.files?.applicant_passport) {
      applicant_passport = req?.files?.applicant_passport[0]?.filename;
    } else {
      applicant_passport = req?.body?.applicant_passport;
    }

    if (req?.files?.applicant_resume) {
      applicant_resume = req?.files?.applicant_resume[0]?.filename;
    } else {
      applicant_resume = req?.body?.applicant_resume;
    }

    const {
      zip,
      city,
      religion,
      province,
      passportno,
      emiratesid,
      homeaddrss,
      uaeresident,
      father_name,
      policeStation,
      martialstatus,
      date_of_expiry,
      nidorcnicnumber,
      emirates_expiry,
      reference,
      spouse,
    } = req.body;

    const applicant = await Applicant.findOne({ where: { id } });

    if (!applicant) return res.status(404).send("Data not found by Id.");

    await applicant.update({
      zip,
      city,
      religion,
      province,
      passportno,
      homeaddrss,
      father_name,
      policeStation,
      martialstatus,
      date_of_expiry,
      reference,
      nid_cnic_front,
      nid_cnic_back,
      nidorcnicnumber,
      applicant_resume,
      applicant_passport,
      uaeresident,
      emiratesid: uaeresident === "no" ? null : emiratesid,
      emirates_expiry: uaeresident === "no" ? null : emirates_expiry,
      spouse: martialstatus === "married" ? spouse : null,
    });

    res.status(201).send(applicant);
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const updateApplicantLicenseInfo = async (req, res, next) => {
  try {
    const id = req.params.id;

    let UAE_DL_Front;
    let UAE_DL_Back;
    let appli_dri_lisence_frontpart;
    let appli_dri_lisence_backpart;

    if (req?.files?.UAE_DL_Front) {
      UAE_DL_Front = req?.files?.UAE_DL_Front[0]?.filename;
    } else {
      UAE_DL_Front = req?.body?.UAE_DL_Front;
    }

    if (req?.files?.UAE_DL_Back) {
      UAE_DL_Back = req?.files?.UAE_DL_Back[0]?.filename;
    } else {
      UAE_DL_Back = req?.body?.UAE_DL_Back;
    }

    if (req?.files?.appli_dri_lisence_frontpart) {
      appli_dri_lisence_frontpart =
        req?.files?.appli_dri_lisence_frontpart[0]?.filename;
    } else {
      appli_dri_lisence_frontpart = req?.body?.appli_dri_lisence_frontpart;
    }

    if (req?.files?.appli_dri_lisence_backpart) {
      appli_dri_lisence_backpart =
        req?.files?.appli_dri_lisence_backpart[0]?.filename;
    } else {
      appli_dri_lisence_backpart = req?.body?.appli_dri_lisence_backpart;
    }

    const {
      is_agree,
      submissionid,
      appli_dri_number,
      appli_dri_expiry,
      have_uae_licence,
      UAE_Resident_Visa_No,
      UAE_License_No,
      SIM_No,
      ref1_name,
      ref1_email,
      ref1_phone,
      ref1_country,
      ref1_address,
      ref2_name,
      ref2_email,
      ref2_phone,
      ref2_country,
      ref2_address,
    } = req.body;

    const applicant = await Applicant.findOne({ where: { id } });

    if (!applicant) return res.status(404).send("Data not found by Id.");

    await applicant.update({
      is_agree,
      UAE_DL_Back,
      submissionid,
      UAE_DL_Front,
      appli_dri_number,
      have_uae_licence,
      appli_dri_lisence_backpart,
      appli_dri_lisence_frontpart,
      SIM_No: have_uae_licence === "yes" ? SIM_No : null,
      appli_dri_expiry: appli_dri_expiry ? appli_dri_expiry : null,
      UAE_License_No: have_uae_licence === "yes" ? UAE_License_No : null,
      UAE_Resident_Visa_No:
        have_uae_licence === "yes" ? UAE_Resident_Visa_No : null,
      ref1_name,
      ref1_email,
      ref1_phone,
      ref1_country,
      ref1_address,
      ref2_name,
      ref2_email,
      ref2_phone,
      ref2_country,
      ref2_address,
    });

    res.status(201).send(applicant);
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const googleOauthCallBack = async (req, res, next) => {
  try {
    const user = req?.user;

    const payload = {
      id: user.id,
      user_name: user.user_name,
      email: user.email,
    };

    // const accessToken = generateAccessToken(payload);

    // nodemailer(contactMail(user.email, user.user_name, "Login successfully"));

    // res.cookie("access_token", accessToken, {
    //   httpOnly: true,
    //   signed: true,
    //   secure: true,
    //   sameSite: "None",
    //   domain: process.env.FRONTEND_DOMAIN,
    // });

    res.redirect(process.env.GOOGLE_OAUTH_SUCCESS_REDIRECT);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getJobApplicantId,
  updateApplication,
  googleOauthCallBack,
  getAllJobApplicants,
  createApplicantBasicInfo,
  updateApplicantBasicInfo,
  getSecureJobApplicantById,
  updateApplicantLicenseInfo,
  updateApplicantNidOrCnicInfo,
};
