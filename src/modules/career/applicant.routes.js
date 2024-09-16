const { upload } = require("../../config/lib/multerConfig");
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
    
    app.post(
        "/api/v1/public/career/jobs/apply/basic", 
        upload.fields([
            { name: 'applicant_image', maxCount: 1 }
        ]), 
        validate(jobApplyBasicSchema), 
        createApplicantBasicInfo
    );

    app.put(
        "/api/v1/public/career/jobs/apply/basic/:id", 
        upload.fields([
            { name: 'applicant_image', maxCount: 1 }
        ]), 
        validate(jobApplyBasicSchema), 
        updateApplicantBasicInfo
    );

    app.put(
        "/api/v1/public/career/jobs/apply/nid-or-cnic/:id", 
        upload.fields([
            { name: 'applicant_resume', maxCount: 1 },
            { name: 'applicant_passport', maxCount: 1 },
            { name: 'nid_cnic_back', maxCount: 1 },
            { name: 'nid_cnic_front', maxCount: 1 }
        ]), 
        validate(jobApplyNidOrCnicSchema), 
        updateApplicantNidOrCnicInfo
    );

    app.put(
        "/api/v1/public/career/jobs/apply/license/:id", 
        upload.fields([
            { name: 'UAE_DL_front', maxCount: 1 },
            { name: 'UAE_DL_Back', maxCount: 1 },
            { name: 'appli_dri_lisence_frontpart', maxCount: 1 },
            { name: 'appli_dri_lisence_backpart', maxCount: 1 }
        ]), 
        validate(jobApplyLicenseSchema), 
        updateApplicantLicenseInfo
    );
};
