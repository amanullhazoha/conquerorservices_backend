const passport = require("passport");
const { upload } = require("../../config/lib/multerConfig");
const validate = require("../../config/middlewares/validate.middlware");
const {
  getJobApplicantId,
  googleOauthCallBack,
  getAllJobApplicants,
  createApplicantBasicInfo,
  updateApplicantBasicInfo,
  updateApplicantLicenseInfo,
  updateApplicantNidOrCnicInfo,
} = require("./applicant.controller");
const {
  jobApplyBasicSchema,
  jobApplyLicenseSchema,
  jobApplyNidOrCnicSchema,
} = require("./applicant.schema");

module.exports = (app) => {
  app.get("/api/v1/secure/career/jobs", getAllJobApplicants);

  app.get("/api/v1/secure/career/jobs/:id", getJobApplicantId);

  app.put("/api/v1/secure/career/jobs/:id", getJobApplicantId);

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
