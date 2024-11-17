const axios = require("axios");
const User = require("../user/user.model");
const { parse, format } = require("date-fns");
const Interview = require("./interview.model");
const Applicant = require("../career/applicant.model");

const formatDateTime = (data, time) => {
  const datePart = parse(data, "yyyy-MM-dd", new Date());
  const [hours, minutes] = time.split(":").map(Number);

  datePart.setHours(hours);
  datePart.setMinutes(minutes);

  const formattedDateTime = format(datePart, "yyyy-MM-dd'T'HH:mm:ss");

  return formattedDateTime;
};

const fetchAccessToken = async () => {
  try {
    const response = await axios.post("https://zoom.us/oauth/token", null, {
      params: {
        grant_type: "account_credentials",
        client_id: process.env.ZOOM_CLIENT_ID,
        account_id: process.env.ZOOM_ACCOUNT_ID,
        client_secret: process.env.ZOOM_CLIENT_SECRET,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);

    return null;
  }
};

const createZoomMeeting = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = req.user;

    const { time, message, zonecountry, scheduled_at, interview_method } =
      req.body;

    const jobApplicant = await Applicant.findOne({ where: { id } });

    if (!jobApplicant) return res.status(404).send("Data not found by ID.");

    const access_token = await fetchAccessToken();

    const payload = {
      topic: message,
      type: 2,
      start_time: formatDateTime(req?.body?.scheduled_at, req?.body?.time),
      timezone: zonecountry,
      settings: {
        host_video: true,
        participant_video: true,
      },
    };

    if (access_token) {
      const response = await axios.post(
        "https://api.zoom.us/v2/users/me/meetings",
        payload,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const [applicantInterview, created] = await Interview.findOrCreate({
        where: { applicant_id: id },
        defaults: {
          time,
          message,
          zonecountry,
          scheduled_at,
          applicant_id: id,
          interview_method,
          invitedby: user?.id,
          meetingUrl: response?.data?.join_url,
        },
      });

      if (!created)
        return res.status(400).json({ message: "Already exist a scheduled." });

      await jobApplicant.update({ applicant_status: "invited" });

      console.log(response?.data);

      res.status(201).json({
        message: "Online meeting scheduled created.",
        data: applicantInterview,
      });

      // res.status(200).json(response?.data);
    } else {
      res.status(400).send("Can not get access token");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createInPersonMeeting = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = req.user;

    const {
      time,
      city,
      state,
      message,
      address,
      post_office,
      zonecountry,
      scheduled_at,
      police_station,
      required_document,
      interview_method,
    } = req.body;

    const jobApplicant = await Applicant.findOne({ where: { id } });

    if (!jobApplicant)
      return res.status(404).json({ message: "Data not found by ID." });

    const [applicantInterview, created] = await Interview.findOrCreate({
      where: { applicant_id: id },
      defaults: {
        time,
        city,
        state,
        message,
        address,
        post_office,
        zonecountry,
        scheduled_at,
        police_station,
        applicant_id: id,
        required_document,
        interview_method,
        invitedby: user?.id,
      },
    });

    if (!created)
      return res.status(400).json({ message: "Already exist a scheduled." });

    await jobApplicant.update({ applicant_status: "invited" });

    res.status(201).json({
      message: "In person meeting scheduled created.",
      data: applicantInterview,
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const getApplicantInterviewDetail = async (req, res, next) => {
  try {
    const id = req.params.id;

    const jobApplicant = await Applicant.findOne({ where: { id } });

    if (!jobApplicant)
      return res.status(404).json({ message: "Data not found by ID." });

    const applicantInterview = await Interview.findOne({
      where: { applicant_id: id },
    });

    const user = await User.findOne({
      where: { id: applicantInterview?.invitedby },
    });

    if (!applicantInterview)
      return res
        .status(404)
        .json({ message: "Interview scheduled not found on this applicant." });

    res.status(200).json({
      message: "Successfully get the applicant interview detail.",
      data: {
        jobApplicant,
        applicantInterview,
        invitedBy: user?.full_name,
      },
    });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

module.exports = {
  createZoomMeeting,
  createInPersonMeeting,
  getApplicantInterviewDetail,
};
