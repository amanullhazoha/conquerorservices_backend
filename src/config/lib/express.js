const path = require("path");
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const config = require(path.join(process.cwd(), "src/config"));
const serverError = require(path.join(
  process.cwd(),
  "src/config/middlewares/serverError.middleware"
));

module.exports = async () => {
  const app = express();

  app.use(
    cors({
      origin: [
        "https://apply.conquerror.com",
        "https://portal.conquerror.com",
        "http://localhost:5173",
        "http://localhost:3000",
      ],
      methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
      credentials: true,
    })
  );

  app.set("trust proxy", true);

  app.use(express.json({ limit: "100mb" }));
  app.use(express.urlencoded({ limit: "100mb", extended: true }));

  app.use(cookieParser(process.env.COOKIE_PARSER_TOKEN));
  app.use(
    session({
      secret: "mySecret",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );

  app.use("/uploads", express.static(path.join(process.cwd(), "/uploads")));
  app.use("/images", express.static(path.join(process.cwd(), "/images")));

  const globalConfig = config.getGlobalConfig();

  globalConfig.routes.forEach((routePath) => {
    require(path.resolve(routePath))(app);
  });

  globalConfig.strategies.forEach((strategyPath) => {
    require(path.resolve(strategyPath))();
  });

  app.use(serverError);

  return app;
};
