const Yup = require("yup");

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Email is required"),
});

const signupSchema = Yup.object().shape({
  password: Yup.string().required("Email is required"),
  last_name: Yup.string().required("Last name is required"),
  first_name: Yup.string().required("First name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const agentRegistrationSchema = Yup.object().shape({
  full_name: Yup.string().required("Full name is required"),
  nationality: Yup.string().required("Nationality is required"),
  email: Yup.string()
    .email("This is not a valid email")
    .required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .when("phoneCode", ([phoneCode], schema) => {
      switch ((phoneCode = "Pakistan")) {
        case "Nepal":
          return schema.length(14, "Contact number must be 10 digits");
        case "Pakistan":
          return schema.length(13, "Contact number must be 10 digits");
        case "India":
          return schema.length(13, "Contact number must be 10 digits");
        case "Philippine":
          return schema.length(13, "Contact number must be 10 digits");
        case "Bangladesh":
          return schema.length(14, "Contact number must be 10 digits");
        case "Sri Lanka":
          return schema.length(12, "Contact number must be 9 digits");
        default:
          return schema
            .min(9, "Number minimum 8 digits")
            .max(19, "Number maximum 15 digits")
            .required("Phone number is required");
      }
    }),
  passport_no: Yup.string()
    .max(10, "Passport number max 10 digits.")
    .required("Passport number is required"),
  is_agree: Yup.boolean()
    .required("Agreement is required")
    .isTrue("You must agree to the terms"),
  father_name: Yup.string().required("Father name is required"),
  mother_name: Yup.string().required("Mother name is required"),
  facebook_id: Yup.string(),
  alt_phone: Yup.string()
    .nullable()
    .when("altPhoneCode", ([altPhoneCode], schema) => {
      switch (altPhoneCode) {
        case "Nepal":
          return schema.length(14, "Contact number must be 10 digits");
        case "Pakistan":
          return schema.length(13, "Contact number must be 10 digits");
        case "India":
          return schema.length(13, "Contact number must be 10 digits");
        case "Philippine":
          return schema.length(13, "Contact number must be 10 digits");
        case "Bangladesh":
          return schema.length(14, "Contact number must be 10 digits");
        case "Sri Lanka":
          return schema.length(12, "Contact number must be 9 digits");
        default:
          return schema
            .min(9, "Number minimum 8 digits")
            .max(19, "Number maximum 15 digits")
            .required("Phone number is required");
      }
    }),
  whatsapp_no: Yup.string()
    .nonNullable()
    .when("whatsappCode", ([whatsappCode], schema) => {
      switch (whatsappCode) {
        case "Nepal":
          return schema.length(14, "Contact number must be 10 digits");
        case "Pakistan":
          return schema.length(13, "Contact number must be 10 digits");
        case "India":
          return schema.length(13, "Contact number must be 10 digits");
        case "Philippine":
          return schema.length(13, "Contact number must be 10 digits");
        case "Bangladesh":
          return schema.length(14, "Contact number must be 10 digits");
        case "Sri Lanka":
          return schema.length(12, "Contact number must be 9 digits");
        default:
          return schema
            .min(9, "Number minimum 8 digits")
            .max(19, "Number maximum 15 digits")
            .required("Phone number is required");
      }
    }),
  telegram_id: Yup.string()
    .nullable()
    .when("telegramCode", ([telegramCode], schema) => {
      switch (telegramCode) {
        case "Nepal":
          return schema.length(14, "Contact number must be 10 digits");
        case "Pakistan":
          return schema.length(13, "Contact number must be 10 digits");
        case "India":
          return schema.length(13, "Contact number must be 10 digits");
        case "Philippine":
          return schema.length(13, "Contact number must be 10 digits");
        case "Bangladesh":
          return schema.length(14, "Contact number must be 10 digits");
        case "Sri Lanka":
          return schema.length(12, "Contact number must be 9 digits");
        default:
          return schema
            .min(9, "Number minimum 8 digits")
            .max(19, "Number maximum 15 digits")
            .required("Phone number is required");
      }
    }),
  marital_status: Yup.string().required("Marital status is required"),
  spouse: Yup.string().when("marital_status", ([marital_status], schema) => {
    if (marital_status === "married") {
      return schema.required("Spouse name is required");
    }
    return schema.nullable();
  }),
  spouse_contact_no: Yup.string().when(
    "marital_status",
    ([marital_status], schema) => {
      if (marital_status === "married") {
        return schema
          .required("Phone number is required")
          .when("spouseConCode", ([spouseConCode], schema) => {
            switch (spouseConCode) {
              case "Nepal":
                return schema.length(14, "Contact number must be 10 digits");
              case "Pakistan":
                return schema.length(13, "Contact number must be 10 digits");
              case "India":
                return schema.length(13, "Contact number must be 10 digits");
              case "Philippine":
                return schema.length(13, "Contact number must be 10 digits");
              case "Bangladesh":
                return schema.length(14, "Contact number must be 10 digits");
              case "Sri Lanka":
                return schema.length(12, "Contact number must be 9 digits");
              default:
                return schema
                  .min(9, "Number minimum 8 digits")
                  .max(19, "Number maximum 15 digits")
                  .required("Contact number is required");
            }
          });
      }
      return schema.nullable();
    }
  ),
  reference: Yup.string(),
  passport_front_page: Yup.string(),
  passport_special_page: Yup.string(),
  nid_front_page: Yup.string(),
  nid_back_page: Yup.string(),
  profile_image: Yup.string(),
  resident_visa: Yup.string(),
  business_license_copy: Yup.string(),
});

const employeeRegistrationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  nationality: Yup.string().required("Nationality is required"),
  email: Yup.string()
    .email("This is not a valid email")
    .required("Email is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .when("nationality", ([nationality], schema) => {
      switch (nationality) {
        case "Nepal":
          return schema.length(14, "Contact number must be 10 digits");
        case "Pakistan":
          return schema.length(13, "Contact number must be 10 digits");
        case "India":
          return schema.length(13, "Contact number must be 10 digits");
        case "Philippine":
          return schema.length(13, "Contact number must be 10 digits");
        case "Bangladesh":
          return schema.length(14, "Contact number must be 10 digits");
        case "Sri Lanka":
          return schema.length(12, "Contact number must be 9 digits");
        default:
          return schema
            .min(9, "Number minimum 8 digits")
            .max(19, "Number maximum 15 digits")
            .required("Phone number is required");
      }
    }),
  date_of_birth: Yup.string()
    .required("Date of birth is required")
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "Date of birth must be in the format YYYY-MM-DD"
    )
    .test("isValidDate", "Date of birth must be a valid date", (value) => {
      return !isNaN(Date.parse(value));
    }),
  is_agree: Yup.boolean()
    .required("Agreement is required")
    .isTrue("You must agree to the terms"),
  father_name: Yup.string().required("Father name is required"),
  mother_name: Yup.string().required("Mother name is required"),
  passport_no: Yup.string()
    .max(10, "Passport number max 10 digits.")
    .required("Passport number is required"),
  passport_expiry_date: Yup.string()
    .required("Passport expiry date is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format YYYY-MM-DD")
    .test("isValidDate", "Date must be a valid date", (value) => {
      return !isNaN(Date.parse(value));
    }),
  marital_status: Yup.string().required("Marital status is required"),
  spouse: Yup.string().when("marital_status", ([marital_status], schema) => {
    if (marital_status === "married") {
      return schema.required("Spouse name is required");
    }
    return schema.nullable();
  }),
  spouse_contact_no: Yup.string().when(
    "marital_status",
    ([marital_status], schema) => {
      if (marital_status === "married") {
        return schema
          .required("Phone number is required")
          .when("spouseConCode", ([spouseConCode], schema) => {
            switch (spouseConCode) {
              case "Nepal":
                return schema.length(14, "Phone number must be 10 digits");
              case "Pakistan":
                return schema.length(13, "Phone number must be 10 digits");
              case "India":
                return schema.length(13, "Phone number must be 10 digits");
              case "Philippine":
                return schema.length(13, "Phone number must be 10 digits");
              case "Bangladesh":
                return schema.length(14, "Phone number must be 10 digits");
              case "Sri Lanka":
                return schema.length(12, "Phone number must be 9 digits");
              default:
                return schema
                  .min(9, "Phone number minimum 8 digits")
                  .max(19, "Phone number maximum 15 digits")
                  .required("Phone number is required");
            }
          });
      }
      return schema.nullable();
    }
  ),
  whatsapp_no: Yup.string()
    .nonNullable()
    .when("whatsappCode", ([whatsappCode], schema) => {
      switch (whatsappCode) {
        case "Nepal":
          return schema.length(14, "Number must be 10 digits");
        case "Pakistan":
          return schema.length(13, "Number must be 10 digits");
        case "India":
          return schema.length(13, "Number must be 10 digits");
        case "Philippine":
          return schema.length(13, "Number must be 10 digits");
        case "Bangladesh":
          return schema.length(14, "Number must be 10 digits");
        case "Sri Lanka":
          return schema.length(12, "Number must be 9 digits");
        default:
          return schema
            .min(9, "Number minimum 8 digits")
            .max(19, "Number maximum 15 digits")
            .required("Number is required");
      }
    }),
  uae_resident: Yup.boolean().required("UAE resident is required"),
  emirates_id: Yup.string().when("uae_resident", ([uae_resident], schema) => {
    if (uae_resident) {
      return schema.required("emirates ID is required");
    }
    return schema.nullable();
  }),
  emirates_expiry_date: Yup.string().when(
    "uae_resident",
    ([uae_resident], schema) => {
      if (uae_resident) {
        return schema.required("Emirates expiry is required");
      }
      return schema.nullable();
    }
  ),
  nid_number: Yup.string().required("NID/CNIC number is required"),
  zip: Yup.string().required("Zip is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  police_station: Yup.string().required("Police station is required"),
  home_address: Yup.string().required("Home address is required"),
  reference_name: Yup.string(),
  position_id: Yup.string().required("Position is required"),
  department: Yup.string().required("Department is required"),
  passport_front_page: Yup.string(),
  passport_special_page: Yup.string(),
  nid_front_page: Yup.string(),
  nid_back_page: Yup.string(),
  profile_image: Yup.string(),
  resident_visa: Yup.string(),
});

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string().required("Email is required"),
  token: Yup.string().required("Token ID is required"),
});

module.exports = {
  loginSchema,
  signupSchema,
  resetPasswordSchema,
  forgotPasswordSchema,
  agentRegistrationSchema,
  employeeRegistrationSchema,
};
