const express = require("express");
const { engine } = require("express-handlebars");
const Handlebars = require("handlebars");
const path = require("path");
const methodOverride = require('method-override')

const logger = require("morgan");
//config authenication
const passport = require('passport');
const bcrypt = require('bcrypt');
const session = require('express-session');

const routes = require('./routes/index')

const {
    allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// use logger and use read json , static file
// app.use(logger("dev"));

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


routes(app)

// app.get("/services/service-details", function(req, res) {
//     res.render("service-details");
// });

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});