const express = require("express");
const { engine } = require("express-handlebars");
const Handlebars = require("handlebars");
const path = require("path");

const {
    allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.get("/rooms/room-detail", function(req, res) {
    res.render("room-detail");
});
app.get("/services", function(req, res) {
    res.render("services");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});