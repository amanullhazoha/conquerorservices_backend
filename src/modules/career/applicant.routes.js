const passport = require("passport");
const { upload } = require("../../config/lib/multerConfig");
const validate = require("../../config/middlewares/validate.middlware");
const {
  jobApplicantSchema,
  jobApplyBasicSchema,
  jobApplyLicenseSchema,
  jobApplyNidOrCnicSchema,
} = require("./applicant.schema");
const {
  getJobApplicantId,
  updateApplication,
  googleOauthCallBack,
  getAllJobApplicants,
  applicantVerifyByOTP,
  getJobApplicantMailCheck,
  checkApplicantValidToken,
  createApplicantBasicInfo,
  updateApplicantBasicInfo,
  getSecureJobApplicantById,
  applicantVerifyUsingEmail,
  updateApplicantLicenseInfo,
  updateApplicantNidOrCnicInfo,
  applicantVerifyUsingPassport,
  applicantIdentifySuccessFully,
} = require("./applicant.controller");

module.exports = (app) => {
  app.get("/api/v1/public/career/jobs/mail-check", getJobApplicantMailCheck);

  app.get("/api/v1/secure/career/jobs", getAllJobApplicants);

  app.get("/api/v1/secure/career/jobs/:id", getSecureJobApplicantById);

  app.put(
    "/api/v1/secure/career/jobs/:id",
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
