const validate = require("../../config/middlewares/validate.middlware");
const { 
    getJobApplicantId,
    getAllJobApplicants, 
    createApplicantBasicInfo,
    updateApplicantBasicInfo,
    updateApplicantLicenseInfo,
    updateApplicantNidOrCnicInfo,
} = require("./applicant.controller");
const { 
    jobApplyBasicSchema, 
    jobApplyLicenseSchema, 
    jobApplyNidOrCnicSchema 
} = require("./applicant.schema");

module.exports = (app) => {
    app.get("/api/v1/public/career/jobs", getAllJobApplicants);

    app.get("/api/v1/public/career/jobs/:id", getJobApplicantId);
    
    app.post("/api/v1/public/career/jobs/apply/basic", validate(jobApplyBasicSchema), createApplicantBasicInfo);

    app.put("/api/v1/public/career/jobs/apply/basic", validate(jobApplyBasicSchema), updateApplicantBasicInfo);

    app.post("/api/v1/public/career/jobs/apply/nid-or-cnic", validate(jobApplyNidOrCnicSchema), updateApplicantNidOrCnicInfo);

    app.post("/api/v1/public/career/jobs/apply/license", validate(jobApplyLicenseSchema), updateApplicantLicenseInfo);
};
