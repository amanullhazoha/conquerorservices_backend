const validate = require("../../config/middlewares/validate.middlware");
const {
  userLogin,
  //   userEmailVerify,
  userPasswordReset,
  userForgotPassword,
} = require("./auth.controller");
const {
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require("./auth.schema");

module.exports = (app) => {
  app.post("/api/v1/public/login", validate(loginSchema), userLogin);

  app.post(
    "/api/v1/public/forgot-password",
    validate(forgotPasswordSchema),
    userForgotPassword
  );

  app.post(
    "/api/v1/public/reset-password",
    validate(resetPasswordSchema),
    userPasswordReset
  );

  //   app.post("/api/v1/public/email-verify", userEmailVerify);
};
