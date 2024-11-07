const validate = require("../../config/middlewares/validate.middlware");
const {
  authenticationMiddleware,
} = require("../../config/middlewares/authentication.middleware");
const {
  userLogin,
  userSignUp,
  //   userEmailVerify,
  getRefreshToken,
  userPasswordReset,
  userForgotPassword,
} = require("./auth.controller");
const {
  loginSchema,
  signupSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require("./auth.schema");

module.exports = (app) => {
  app.post("/api/v1/public/login", validate(loginSchema), userLogin);
  app.post("/api/v1/public/sign-up", validate(signupSchema), userSignUp);

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

  app.get(
    "/api/v1/secure/refresh-token",
    authenticationMiddleware,
    getRefreshToken
  );

  //   app.post("/api/v1/public/email-verify", userEmailVerify);
};
