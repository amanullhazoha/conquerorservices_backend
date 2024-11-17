const validate = require("../../config/middlewares/validate.middlware");
const {
  authenticationMiddleware,
} = require("../../config/middlewares/authentication.middleware");
const {
  authorizationMiddleware,
} = require("../../config/middlewares/authorization.middleware");
const {
  createZoomMeeting,
  createInPersonMeeting,
  getApplicantInterviewDetail,
} = require("./zoom.controller.js");
const {
  onlineInterviewSchema,
  inPersonInterviewSchema,
} = require("./zoom.schema.js");

module.exports = (app) => {
  app.get(
    "/api/v1/secure/meeting/:id",
    authenticationMiddleware,
    authorizationMiddleware(["super_admin"]),
    getApplicantInterviewDetail
  );
  app.post(
    "/api/v1/secure/zoom-meeting/:id",
    authenticationMiddleware,
    authorizationMiddleware(["super_admin"]),
    validate(onlineInterviewSchema),
    createZoomMeeting
  );
  app.post(
    "/api/v1/secure/in-person-meeting/:id",
    authenticationMiddleware,
    authorizationMiddleware(["super_admin"]),
    validate(inPersonInterviewSchema),
    createInPersonMeeting
  );
};
