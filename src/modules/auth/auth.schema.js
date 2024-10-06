const Yup = require("yup");

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Email is required"),
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
  forgotPasswordSchema,
  resetPasswordSchema,
};
