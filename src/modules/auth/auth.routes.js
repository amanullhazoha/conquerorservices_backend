const { upload } = require("../../config/lib/multerConfig");
const validate = require("../../config/middlewares/validate.middlware");
const {
  authenticationMiddleware,
} = require("../../config/middlewares/authentication.middleware");
const {
  userLogin,
  userSignUp,
  getUserMailCheck,
  agentRegistration,
  employeeRegistration,
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
  agentRegistrationSchema,
  employeeRegistrationSchema,
} = require("./auth.schema");

module.exports = (app) => {
  app.get("/api/v1/public/user/mail-check", getUserMailCheck);
  app.post("/api/v1/public/login", validate(loginSchema), userLogin);
  app.post("/api/v1/public/sign-up", validate(signupSchema), userSignUp);
  app.post(
    "/api/v1/public/agent-registration",
    upload.fields([
      { name: "passport_front_page", maxCount: 1 },
      { name: "passport_special_page", maxCount: 1 },
      { name: "nid_front_page", maxCount: 1 },
      { name: "nid_back_page", maxCount: 1 },
      { name: "profile_image", maxCount: 1 },
      { name: "resident_visa", maxCount: 1 },
      { name: "business_license_copy", maxCount: 1 },
    ]),
    validate(agentRegistrationSchema),
    agentRegistration
  );
  app.post(
    "/api/v1/public/employee-registration",
    upload.fields([
      { name: "passport_front_page", maxCount: 1 },
      { name: "passport_special_page", maxCount: 1 },
      { name: "nid_front_page", maxCount: 1 },
      { name: "nid_back_page", maxCount: 1 },
      { name: "profile_image", maxCount: 1 },
      { name: "resident_visa", maxCount: 1 },
    ]),
    validate(employeeRegistrationSchema),
    employeeRegistration
  );

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
