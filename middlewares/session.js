const session = require("express-session");
require("dotenv").config();

module.exports = (app) => {
  app.set("trust proxy", 1); // trust first proxy
  app.use(
    session({
      secret: process.env.SECRET_KEY || "keyboard cat",
      resave: false,
      saveUninitialized: true,
      cookie: {
        // secure: true
      },
    })
  );
};
