const { getUserReferCodeCheck } = require("./user.controller");

module.exports = (app) => {
  app.get("/api/v1/public/user/refer-code", getUserReferCodeCheck);
};
