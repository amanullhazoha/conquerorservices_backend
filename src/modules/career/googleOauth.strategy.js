const passport = require("passport");
const Applicant = require("./applicant.model");
const { Strategy } = require("passport-google-oauth2");
const nodemailer = require("../../config/emailService/config");
const { verifySuccessMail } = require("../../config/emailService/template");

module.exports = () => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        if (profile) {
          const isExist =
            profile?.email &&
            (await Applicant.findOne({ where: { email: profile?.email } }));

          if (!isExist) {
            return done(null, false);
          }

          return done(null, { id: isExist?.id, email: isExist?.email });
        }

        return done(null, false);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
