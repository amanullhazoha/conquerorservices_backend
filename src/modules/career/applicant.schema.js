const { string, object } = require("yup");

const jobApplyBasicSchema = object().shape({
    first_name: string()
        .required("This field must not be empty."),
    last_name: string()
        .required("This field must not be empty."),
    mother_name: string()
        .required("This field must not be empty."),
    date_of_birth: string()
        .required("This  field must not be empty."),
    gender: string()
        .required("This  field must not be empty."),
    nationality: string()
        .required("This  field must not be empty."),
    email: string()
        .required("This  field must not be empty."),
    contact_number: string()
        .required("This  field must not be empty."),
    whatsapp_number: string()
        .required("This  field must not be empty."),
    position_id: string()
        .required("This  field must not be empty."),
    applicant_image: string()
        .required("This  field must not be empty.")
});

const jobApplyNidOrCnicSchema = object().shape({
    passportno: string()
        .required("This field must not be empty."),
    date_of_expiry: string()
        .required("This field must not be empty."),
    father_name: string()
        .required("This field must not be empty."),
    nidorcnicnumber: string()
        .required("This  field must not be empty."),
    matiulstatus: string()
        .required("This  field must not be empty."),
    uaeresidient: string()
        .required("This  field must not be empty."),
    emiratesid: string()
        .required("This  field must not be empty."),
    emirates_expiry: string()
        .required("This  field must not be empty."),
    religion: string()
        .required("This  field must not be empty."),
    applicant_image: string()
        .required("This  field must not be empty.")
});

const jobApplyLicenseSchema = object().shape({
    submissionid: string()
        .required("This field must not be empty."),
    appli_dir_number: string()
        .required("This field must not be empty."),
    appli_dir_number: string()
        .required("This field must not be empty."),
    have_uae_license: string()
        .required("This  field must not be empty."),
    matiulstatus: string()
        .required("This  field must not be empty."),
    uaeresidient: string()
        .required("This  field must not be empty."),
    emiratesid: string()
        .required("This  field must not be empty."),
    emirates_expiry: string()
        .required("This  field must not be empty."),
    religion: string()
        .required("This  field must not be empty."),
    applicant_image: string()
        .required("This  field must not be empty.")
});

module.exports = {
    jobApplyBasicSchema,
    jobApplyLicenseSchema,
    jobApplyNidOrCnicSchema
};