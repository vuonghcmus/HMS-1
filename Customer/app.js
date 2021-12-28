const express = require("express");
const { engine } = require("express-handlebars");
const Handlebars = require("handlebars");
const path = require("path");
const methodOverride = require('method-override')

const mongoose = require("mongoose");
// mongoose.connect(process.env.da)

const logger = require("morgan");
//config authenication
const passport = require('passport');
const bcrypt = require('bcrypt');
const session = require('express-session');

//config router
const CustomerRoute = require("./routes/customer.route")
const ServiceRouter = require("./routes/service.route");

const {
    allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
// use logger and use read json , static file
app.use(logger("dev"));

require("./middlewares/session")(app);
require("./middlewares/passport")(app);
app.use(require("./middlewares/locals"));

app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: "main",
        handlebars: allowInsecurePrototypeAccess(Handlebars),
    })
);
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/about-us", function(req, res) {
    res.render("about-us");
});

app.get("/blog", function(req, res) {
    res.render("blog");
});

app.get("/contact", function(req, res) {
    res.render("contact");
});

app.get("/elements", function(req, res) {
    res.render("elements");
});

app.get("/rooms", function(req, res) {
    res.render("rooms");
});
app.get("/rooms/room-details", function(req, res) {
    res.render("room-details");
});
// app.get("/services", function(req, res) {
//     res.render("services");
// });
app.get("/services/service-details", function(req, res) {
    res.render("service-details");
});
app.get("/search-order", function(req, res) {
    res.render("search-order");
});
app.use("/sign-in", CustomerRoute);
// app.get("/sign-in", function(req, res) {
//     res.render("sign-in", { layout: 'main_no_head' }); 
// });

app.use("/services", ServiceRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});