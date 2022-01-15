const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const Handlebars = require("handlebars");
const socket = require("socket.io");
const cors = require("cors");
const express_handlebars_sections = require("express-handlebars-sections");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const env = require("dotenv").config();
const databaseService = require("./services/database.service");
const AccountRoute = require("./routes/account.route");
const ServiceRoute = require("./routes/service.route");
const ServiceTypeRoute = require("./routes/serviceType.route");
const RoomTypeRoute = require("./routes/roomType.route");
const StaffRoute = require("./routes/staff.route");
const CustomerRoute = require("./routes/customer.route");
const RoomRoute = require("./routes/room.route");
const ReceiptRoute = require("./routes/receipt.route");
const ApiNotificationRoute = require("./api/notification/notification.route");

databaseService.connectDatabase();

const app = express();

app.engine(
  "hbs",
  exphbs({
    extname: ".hbs",
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
      section: express_handlebars_sections(),
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

app.use(express.static(path.join(__dirname, "/public")));

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

require("./middlewares/session")(app);
require("./middlewares/passport")(app);
app.use(require("./middlewares/locals"));

app.use("/staff", StaffRoute);

app.use((req, res, next) => {
  if (!req.user) {
    res.redirect("/staff/login");
  } else {
    next();
  }
});

app.get("/", function (req, res) {
  res.render("home");
});

app.use("/account", AccountRoute);
app.use("/customer", CustomerRoute);
app.use("/service", ServiceRoute);
app.use("/service-type", ServiceTypeRoute);
app.use("/room-type", RoomTypeRoute);
app.use("/room", RoomRoute);
app.use("/receipt", ReceiptRoute);
app.use("/api/notification", ApiNotificationRoute);

app.get("/test", (req, res) => {
  res.render("test");
});

app.get("/test1", (req, res) => {
  res.render("test1");
});

app.use((req, res) => {
  res.render("errors/404", { layout: false });
});

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).render("errors/500", { layout: false, error: err.message });
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`App listening on port ${process.env.PORT || 3000}`);
});

const io = socket(server);
io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("disconnect", function () {
    console.log("Made socket disconnected");
  });

  socket.on("send-notification", function (data) {
    // io.emit("new-notification", data);
    socket.broadcast.emit("new-notification", data);
  });

  socket.on("send-service-notification", function (data) {
    socket.broadcast.emit("new-service-notification", data);
  });
});
