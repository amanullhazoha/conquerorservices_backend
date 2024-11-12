const validate = require("../../config/middlewares/validate.middlware");
const {
  authenticationMiddleware,
} = require("../../config/middlewares/authentication.middleware");
const {
  authorizationMiddleware,
} = require("../../config/middlewares/authorization.middleware");
const { createZoomMeeting } = require("./zoom.controller.js");

module.exports = (app) => {
  app.post(
    "/api/v1/secure/zoom-meeting/:id",
    authenticationMiddleware,
    authorizationMiddleware(["super_admin"]),
    createZoomMeeting
  );
};
