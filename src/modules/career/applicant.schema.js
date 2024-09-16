const Yup = require('yup');

const jobApplyBasicSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  mother_name: Yup.string().required('Mother name is required'),
  gender: Yup.string().required('Gender is required'),
  date_of_birth: Yup.string()
    .required('Date of birth is required')
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      'Date of birth must be in the format YYYY-MM-DD'
    )
    .test('isValidDate', 'Date of birth must be a valid date', value => {
      return !isNaN(Date.parse(value));
    }),
  nationality: Yup.string().required('Nationality is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  contact_number: Yup.string()
    .required('Contact number is required')
    .when('nationality', ([nationality], schema) => {
      console.log(nationality)
      switch (nationality) {
        case 'Nepal':
        case 'Pakistan':
        case 'India':
        case 'Philippine':
        case 'Bangladesh':
          return schema.length(10, 'Contact number must be 10 digits');
        case 'Sri Lanka':
          return schema.length(9, 'Contact number must be 9 digits');
        default:
          return schema;
      }
    }),
  whatsapp_number: Yup.string(),
  position_id: Yup.string().required('Position ID is required'),
  hiring_position: Yup.string().when('position_id', (position_id, schema) => {
    if (position_id === '52' || position_id === 52) {
      return schema.required('Hiring position is required');
    }
    return schema.nullable();
  }),
  // applicant_image: Yup.mixed()
  //   .required('Applicant image is required')
});

const jobApplyNidOrCnicSchema = Yup.object().shape({
  zip: Yup.string().required('Zip is required'),
  city: Yup.string().required('City is required'),
  religion: Yup.string().required('Religion is required'),
  province: Yup.string().required('Province is required'),
  passportno: Yup.string().required('Passport number is required'),
  homeaddrss: Yup.string().required('Home address is required'),
  uaeresident: Yup.string().required('UAE resident is required')
    .matches(/^(yes|no)$/i, 'UAE resident must be "yes" or "no"'),
  emiratesid: Yup.string().when('uaeresident', ([uaeresident], schema) => {
    if (uaeresident === 'yes') {
      return schema.required('Emirates ID is required');
    }
    return schema.nullable();
  }),
  emirates_expiry: Yup.string().when('uaeresident', ([uaeresident], schema) => {
    if (uaeresident === 'yes') {
      return schema.required('Emirates expiry is required');
    }
    return schema.nullable();
  }),
  father_name: Yup.string().required('Father\'s name is required'),
  policeStation: Yup.string().required('Police station is required'),
  martialstatus: Yup.string().required('Marital status is required'),
  date_of_expiry: Yup.string().required('Date of expiry is required'),
  nidorcnicnumber: Yup.string().required('NID/CNIC number is required'),
//   applicant_resume: Yup.mixed().required('Applicant resume is required'),
  reference: Yup.string(),
//   applicant_passport: Yup.mixed().required('Applicant passport is required'),
//   nid_cnic_back: Yup.mixed().required('NID/CNIC back is required'),
//   nid_cnic_front: Yup.mixed().required('NID/CNIC front is required'),
});

const jobApplyLicenseSchema = Yup.object().shape({
//   is_agree: Yup.boolean().required('Agreement is required').isTrue('You must agree to the terms'),
  submissionid: Yup.string().required('Submission ID is required'),
//   UAE_DL_Front: Yup.string().when('position_id', ([position_id], schema) => {
//     if (position_id === '50' || position_id === 50) {
//       return schema.required('UAE license front is required');
//     }
//     return schema.nullable();
//   }),
//   UAE_DL_Back: Yup.string().when('position_id', ([position_id], schema) => {
//     if (position_id === '50' || position_id === 50) {
//       return schema.required('UAE license back is required');
//     }
//     return schema.nullable();
//   }),
  appli_dri_number: Yup.string().when('position_id', ([position_id], schema) => {
    if (position_id === '50' || position_id === 50) {
      return schema.required('Driving license is required');
    }
    return schema.nullable();
  }),
  appli_dri_expiry: Yup.string().when('position_id', ([position_id], schema) => {
    if (position_id === '50' || position_id === 50) {
      return schema.required('License expiry date is required');
    }
    return schema.nullable();
  }),
  have_uae_licence: Yup.string().when('position_id', ([position_id], schema) => {
    if (position_id === '50' || position_id === 50) {
      return schema.required('UAE license is required');
    }
    return schema.nullable();
  }),
  UAE_License_No: Yup.string().when('position_id', ([position_id], schema) => {
    if (position_id === '50' || position_id === 50) {
      return schema.required('UAE license No is required');
    }
    return schema.nullable();
  }),
  UAE_Resident_Visa_No: Yup.string().when('position_id', ([position_id], schema) => {
    if (position_id === '50' || position_id === 50) {
      return schema.required('UAE resident visa No is required');
    }
    return schema.nullable();
  }),
  SIM_No: Yup.string().when('position_id', ([position_id], schema) => {
    if (position_id === '50' || position_id === 50) {
      return schema.required('SIM No is required');
    }
    return schema.nullable();
  }),
//   appli_dri_lisence_frontpart: Yup.string().when('position_id', ([position_id], schema) => {
//     if (position_id === '50' || position_id === 50) {
//       return schema.required('License front part is required');
//     }
//     return schema.nullable();
//   }),
//   appli_dri_lisence_backpart: Yup.string().when('position_id', ([position_id], schema) => {
//     if (position_id === '50' || position_id === 50) {
//       return schema.required('License back part is required');
//     }
//     return schema.nullable();
//   }),
});


module.exports = {
    jobApplyBasicSchema,
    jobApplyLicenseSchema,
    jobApplyNidOrCnicSchema
};