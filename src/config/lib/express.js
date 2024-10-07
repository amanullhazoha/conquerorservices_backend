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

  // const allowedOrigins = process.env.FRONTEND_BASE_URL.split(",");

  // // Define CORS options
  // const corsOptions = {
  //   // origin: (origin, callback) => {
  //   //   // Check if the origin is allowed
  //   //   if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
  //   //     callback(null, true);
  //   //   } else {
  //   //     console.error(`Origin not allowed by CORS: ${origin}`);
  //   //     callback(new Error("Not allowed by CORS"));
  //   //   }
  //   // },
  //   // methods: "GET,POST,PUT,DELETE",
  //   // allowedHeaders: "Content-Type,Authorization",
  //   credentials: true,
  // };

  const corsOptions = {
    origin: /https:\/\/.*\.conquerror\.com/,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  };

  // Use the cors middleware with the defined options
  app.use(cors(corsOptions));

  app.set("trust proxy", true);

  app.use(express.json({ limit: "100mb" }));
  app.use(express.urlencoded({ limit: "100mb", extended: true }));

  app.options("*", cors(corsOptions));

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
