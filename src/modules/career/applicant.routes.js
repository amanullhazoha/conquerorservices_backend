const passport = require("passport");
const { upload } = require("../../config/lib/multerConfig");
const validate = require("../../config/middlewares/validate.middlware");
const {
  authenticationMiddleware,
} = require("../../config/middlewares/authentication.middleware");
const {
  authorizationMiddleware,
} = require("../../config/middlewares/authorization.middleware");
const {
  jobApplicantSchema,
  jobApplyBasicSchema,
  jobStatusUpdateSchema,
  jobApplyLicenseSchema,
  jobApplyNidOrCnicSchema,
} = require("./applicant.schema");
const {
  applicantImageUpdate,
  getJobApplicantId,
  updateApplication,
  googleOauthCallBack,
  getAllJobApplicants,
  getAllNewApplicants,
  applicantVerifyByOTP,
  jobApplicantChangeMail,
  getJobApplicantMailCheck,
  checkApplicantValidToken,
  createApplicantBasicInfo,
  getAllInterviewApplicants,
  updateApplicantBasicInfo,
  getSecureJobApplicantById,
  applicantVerifyUsingEmail,
  updateApplicantLicenseInfo,
  updateApplicantNidOrCnicInfo,
  applicantVerifyUsingPassport,
  applicantIdentifySuccessFully,
  applicationStatusUpdateById,
} = require("./applicant.controller");

module.exports = (app) => {
  app.get("/api/v1/public/career/jobs/mail-check", getJobApplicantMailCheck);

  app.get(
    "/api/v1/secure/career/jobs",
    authenticationMiddleware,
    authorizationMiddleware(["super_admin", "checker"]),
    getAllJobApplicants
  );

  app.get(
    "/api/v1/secure/career/jobs/interview",
    authenticationMiddleware,
    authorizationMiddleware(["super_admin", "checker"]),
    getAllInterviewApplicants
  );
  app.get(
    "/api/v1/secure/career/jobs/new-application",
    authenticationMiddleware,
    authorizationMiddleware(["super_admin", "checker"]),
    getAllNewApplicants
  );

  app.get(
    "/api/v1/secure/career/jobs/:id",
    authenticationMiddleware,
    authorizationMiddleware(["super_admin", "checker"]),
    getSecureJobApplicantById
  );

  app.put(
    "/api/v1/secure/career/jobs/:id",
    authenticationMiddleware,
    authorizationMiddleware(["super_admin"]),
    upload.fields([
      { name: "applicant_image", maxCount: 1 },
      { name: "applicant_resume", maxCount: 1 },
      { name: "applicant_passport", maxCount: 1 },
      { name: "nid_cnic_back", maxCount: 1 },
      { name: "nid_cnic_front", maxCount: 1 },
      { name: "UAE_DL_Front", maxCount: 1 },
      { name: "UAE_DL_Back", maxCount: 1 },
      { name: "appli_dri_lisence_frontpart", maxCount: 1 },
      { name: "appli_dri_lisence_backpart", maxCount: 1 },
    ]),
    validate(jobApplicantSchema),
    updateApplication
  );

  app.put(
    "/api/v1/secure/career/jobs-status-update/:id",
    authenticationMiddleware,
    authorizationMiddleware(["super_admin"]),
    validate(jobStatusUpdateSchema),
    applicationStatusUpdateById
  );

  app.get("/api/v1/public/career/jobs/:id", getJobApplicantId);

  app.post(
    "/api/v1/public/career/jobs/apply/basic",
    upload.fields([{ name: "applicant_image", maxCount: 1 }]),
    validate(jobApplyBasicSchema),
    createApplicantBasicInfo
  );

  app.put(
    "/api/v1/public/career/jobs/apply/basic/:id",
    upload.fields([{ name: "applicant_image", maxCount: 1 }]),
    validate(jobApplyBasicSchema),
    updateApplicantBasicInfo
  );

  app.put(
    "/api/v1/public/career/jobs/apply/nid-or-cnic/:id",
    upload.fields([
      { name: "applicant_resume", maxCount: 1 },
      { name: "applicant_passport", maxCount: 1 },
      { name: "nid_cnic_back", maxCount: 1 },
      { name: "nid_cnic_front", maxCount: 1 },
    ]),
    validate(jobApplyNidOrCnicSchema),
    updateApplicantNidOrCnicInfo
  );

  app.put(
    "/api/v1/public/career/jobs/apply/license/:id",
    upload.fields([
      { name: "UAE_DL_Front", maxCount: 1 },
      { name: "UAE_DL_Back", maxCount: 1 },
      { name: "appli_dri_lisence_frontpart", maxCount: 1 },
      { name: "appli_dri_lisence_backpart", maxCount: 1 },
    ]),
    validate(jobApplyLicenseSchema),
    updateApplicantLicenseInfo
  );

  app.put(
    "/api/v1/public/career/jobs/apply/photo/:id",
    upload.fields([
      { name: "UAE_DL_Front", maxCount: 1 },
      { name: "UAE_DL_Back", maxCount: 1 },
      { name: "appli_dri_lisence_frontpart", maxCount: 1 },
      { name: "appli_dri_lisence_backpart", maxCount: 1 },
    ]),
    // validate(jobApplyLicenseSchema),
    applicantImageUpdate
  );

  app.post("/api/v1/public/change-email", jobApplicantChangeMail);

  app.post("/api/v1/public/identity-by-email", applicantVerifyUsingEmail);
  app.post("/api/v1/public/identity-by-passport", applicantVerifyUsingPassport);
  app.post("/api/v1/public/applicant-verify-by-otp", applicantVerifyByOTP);
  app.get(
    "/api/v1/public/check-applicant-token/:token",
    checkApplicantValidToken
  );
  app.get(
    "/api/v1/public/applicant-identify-successfully/:token",
    applicantIdentifySuccessFully
  );

  app.get(
    "/api/v1/public/google-oauth",
    passport.authenticate("google", {
      access_type: "offline",
      scope: ["profile", "email"],
    }),
    (req, res) => {
      res.status(200).send("user google verify successfully");
    }
  );

  app.get(
    "/api/v1/public/google-oauth-callback",
    passport.authenticate("google", {
      failureRedirect: process.env.GOOGLE_OAUTH_FAILURE_REDIRECT,
    }),
    googleOauthCallBack
  );
};
