const express = require("express");
const exphbs = require("express-handlebars");
const express_handlebars_sections = require("express-handlebars-sections");
const path = require("path");
const bodyParser = require("body-parser");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const env = require("dotenv").config();
const databaseService = require("./services/database.service");
const StaffRoute = require("./routes/staff.route");
const ServiceRoute = require("./routes/service.route");
const ServiceTypeRoute = require("./routes/serviceType.route");
const RoomTypeRoute = require("./routes/roomType.route");
const Revenue = require("./routes/revenue.route");

databaseService.connectDatabase();

const app = express();

app.engine(
  "hbs",
  exphbs({
    section: express_handlebars_sections(),
    extname: ".hbs",
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
      ifCond: function (v1, operator, v2, options) {
        switch (operator) {
          case "==":
            return v1 == v2 ? options.fn(this) : options.inverse(this);
          case "===":
            return v1 === v2 ? options.fn(this) : options.inverse(this);
          case "!=":
            return v1 != v2 ? options.fn(this) : options.inverse(this);
          case "!==":
            return v1 !== v2 ? options.fn(this) : options.inverse(this);
          case "<":
            return v1 < v2 ? options.fn(this) : options.inverse(this);
          case "<=":
            return v1 <= v2 ? options.fn(this) : options.inverse(this);
          case ">":
            return v1 > v2 ? options.fn(this) : options.inverse(this);
          case ">=":
            return v1 >= v2 ? options.fn(this) : options.inverse(this);
          case "&&":
            return v1 && v2 ? options.fn(this) : options.inverse(this);
          case "||":
            return v1 || v2 ? options.fn(this) : options.inverse(this);
          default:
            return options.inverse(this);
        }
      },
    },
  })
);
app.set("view engine", "hbs");

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/public")));

require("./middlewares/session")(app);
require("./middlewares/passport")(app);
app.use(require("./middlewares/locals"));

app.use("/admin", require("./routes/admin.route"));

app.use((req, res, next) => {
  if (!req.user) {
    res.redirect("/admin/login");
  } else {
    next();
  }
});

app.get("/", function (req, res) {
  res.render("home");
});

app.use("/staff", StaffRoute);
app.use("/service", ServiceRoute);
app.use("/service-type", ServiceTypeRoute);
app.use("/room-type", RoomTypeRoute);
app.use("/revenue", Revenue);

app.get("/test", (req, res) => {
  const data = [
    {
      name: "Nguyen Van A",
      info: [1, 2, 3],
    },
    {
      name: "Nguyen Van B",
      info: [4, 5, 6],
    },
  ];
  res.render("test", { data });
});

app.use((req, res) => {
  res.render("errors/404", { layout: false });
});

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).render("errors/500", { layout: false, error: err.message });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening on port ${process.env.PORT || 3000}`);
});
