const path = require("path");
const Applicant = require(path.join(process.cwd(), "src/modules/career/applicant.model"));

const getAllJobApplicants = async (req, res, next) => {
  try {
      const jobApplicant = await Applicant.findAll();

      res.status(200).send(jobApplicant);
  } catch (error) {
      console.log(error);

      next(error);
  }
};

const getJobApplicantId = async (req, res, next) => {
  try {
      const id = req.params.id;
      const jobApplicant = await Applicant.findOne({ where: { id } });

      if (!jobApplicant) return res.status(404).send("Data not found by ID.");

      res.status(200).send(jobApplicant);
  } catch (error) {
      console.log(error);

      next(error);
  }
};

const createApplicantBasicInfo = async (req, res, next) => {
    try {
        const {
            slug,
            title,
            category,
            sort_desc,
            meta_desc,
            meta_title,
            description,
            banner_image,
        } = req.body;

        const applicant = await Blog.create({   
          title,
          category,
          sort_desc,
          meta_desc,
          meta_title,
          description,
          banner_image,
        });

        res.status(201).send(applicant);
    } catch (error) {
        console.log(error);

        next(error)
    }
};

const updateApplicantBasicInfo = async (req, res, next) => {
    try {
        const id = req.params.id;
        const {
            slug,
            title,
            status,
            category,
            sort_desc,
            meta_desc,
            meta_title,
            description,
            banner_image,
        } = req.body;

        const applicant = await Applicant.findOne({ where: { id } });

        if (!applicant) return res.status(404).send("Data not found by Id.");

        await applicant.update({
            title,
            status,
            category,
            sort_desc,
            meta_desc,
            meta_title,
            description,
            banner_image,
            slug: createSlug,
        });

        res.status(201).send(applicant);
    } catch (error) {
        console.log(error);

        next(error)
    }
};

const updateApplicantNidOrCnicInfo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
        slug,
        title,
        status,
        category,
        sort_desc,
        meta_desc,
        meta_title,
        description,
        banner_image,
    } = req.body;

    const applicant = await Applicant.findOne({ where: { id } });

    if (!applicant) return res.status(404).send("Data not found by Id.");

    await applicant.update({
        title,
        status,
        category,
        sort_desc,
        meta_desc,
        meta_title,
        description,
        banner_image,
        slug: createSlug,
    });

    res.status(201).send(applicant);
} catch (error) {
    console.log(error);

    next(error)
}
};

const updateApplicantLicenseInfo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
        slug,
        title,
        status,
        category,
        sort_desc,
        meta_desc,
        meta_title,
        description,
        banner_image,
    } = req.body;

    const applicant = await Applicant.findOne({ where: { id } });

    if (!applicant) return res.status(404).send("Data not found by Id.");

    await applicant.update({
        title,
        status,
        category,
        sort_desc,
        meta_desc,
        meta_title,
        description,
        banner_image,
        slug: createSlug,
    });

    res.status(201).send(applicant);
} catch (error) {
    console.log(error);

    next(error)
}
};

module.exports = {
  getJobApplicantId,
  getAllJobApplicants,
  createApplicantBasicInfo,
  updateApplicantBasicInfo,
  updateApplicantLicenseInfo,
  updateApplicantNidOrCnicInfo,
}
