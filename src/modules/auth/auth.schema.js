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
  forgotPasswordSchema,
  resetPasswordSchema,
};
