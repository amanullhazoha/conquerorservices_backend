const axios = require("axios");
const Applicant = require("../career/applicant.model");
// const Applicant = require("./applicant.model");

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
    const { topic, duration, start_time } = req.body;

    const jobApplicant = await Applicant.findOne({ where: { id } });

    if (!jobApplicant) return res.status(404).send("Data not found by ID.");

    const access_token = await fetchAccessToken();

    const payload = {
      topic,
      type: 2,
      duration,
      start_time,
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

      res.status(200).json(response?.data);
    } else {
      res.status(400).send("Can not get access token");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { createZoomMeeting };
