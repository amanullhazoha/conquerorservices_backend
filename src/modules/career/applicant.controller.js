const path = require("path");
const Applicant = require(path.join(process.cwd(), "src/modules/career/applicant.model"));

const getAllJobApplicants = async (req, res, next) => {
  try {
      const jobApplicant = await Applicant.findAll();

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

const createApplicantBasicInfo = async (req, res, next) => {
    try {
        const applicant_image = req?.files?.applicant_image[0]?.filename;
        
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

        next(error)
    }
};

const updateApplicantBasicInfo = async (req, res, next) => {
    try {
        const id = req.params.id;

        const applicant_image = req?.files?.applicant_image[0]?.filename;
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
            applicant_image
        });

        res.status(201).send(applicant);
    } catch (error) {
        console.log(error);

        next(error)
    }
};

const updateApplicantNidOrCnicInfo = async (req, res, next) => {
  try {
    const id = req.params.id;
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
        maritalstatus,
        date_of_expiry,
        nidofcnicnumber,
        emirates_expiry,
        applicant_resume,
        reference,
        applicant_passport,
        nid_cnic_back,
        nid_cnic_front,
    } = req.body;

    const applicant = await Applicant.findOne({ where: { id } });

    if (!applicant) return res.status(404).send("Data not found by Id.");

    await applicant.update({
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
        maritalstatus,
        date_of_expiry,
        nidofcnicnumber,
        emirates_expiry,
        applicant_resume,
        reference,
        applicant_passport,
        nid_cnic_back,
        nid_cnic_front,
    });

    res.status(201).send(applicant);
} catch (error) {
    console.log(error);

    next(error)
}
};

const updateApplicantLicenseInfo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
        is_agree,
        submissionid,
        UAE_DL_front,
        UAE_DL_Back,
        appli_dir_number,
        appli_dir_expiry,
        have_uae_licence,
        UAE_Resident_Visa_No,
        uae_license_No,
        SIM_No,
        appli_dri_lisence_frontpart,
        appli_dri_lisence_backpart,
    } = req.body;

    const applicant = await Applicant.findOne({ where: { id } });

    if (!applicant) return res.status(404).send("Data not found by Id.");

    await applicant.update({
        is_agree,
        submissionid,
        UAE_DL_front,
        UAE_DL_Back,
        appli_dir_number,
        appli_dir_expiry,
        have_uae_licence,
        UAE_Resident_Visa_No,
        uae_license_No,
        SIM_No,
        appli_dri_lisence_frontpart,
        appli_dri_lisence_backpart,
    });

    res.status(201).send(applicant);
} catch (error) {
    console.log(error);

    next(error)
}
};

module.exports = {
  getJobApplicantId,
  getAllJobApplicants,
  createApplicantBasicInfo,
  updateApplicantBasicInfo,
  updateApplicantLicenseInfo,
  updateApplicantNidOrCnicInfo,
}
