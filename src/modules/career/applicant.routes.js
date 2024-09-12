const validate = require("../../config/middlewares/validate.middlware");
const { getAllJobApplicants } = require("./applicant.controller");

module.exports = (app) => {
    app.get("/api/v1/public/career/jobs", getAllJobApplicants);

    app.get("/api/v1/public/career/jobs/:id",
        (req, res) => {
            res.status(200).send("user job apply id");
        },
    );
    
    app.post("/api/v1/public/career/jobs/apply/basic",
        (req, res) => {
            res.status(200).send("user job apply basic");
        },
    );

    app.put("/api/v1/public/career/jobs/apply/basic",
        (req, res) => {
            res.status(200).send("user job apply basic update");
        },
    );

    app.post("/api/v1/public/career/jobs/apply/nid-or-cnic",
        (req, res) => {
            res.status(200).send("user job apply nid or cnic");
        },
    );

    app.post("/api/v1/public/career/jobs/apply/license",
        (req, res) => {
            res.status(200).send("user job apply license");
        },
    );
};
