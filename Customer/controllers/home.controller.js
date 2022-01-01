const HomeService = require("../services/home/home.service");
class HomeController {
    //[GET] /
    async show(req, res, next) {
        res.render("home/home", {
            isAuth: req.user
        });
    }

    //[GET] /search-order
    async getSearch(req, res, next) {
        const phone = req.query.phone;
        const identity = req.query.identity;
        console.log(phone);
        console.log(identity);
        var listRoom = [];

        if (phone && identity) {
            const bookedRooms = await HomeService.getBookedRoom(phone, identity);
            var empty;
            if (bookedRooms.length <= 0) {
                empty = true;
            } else {
                empty = false;
            }
            res.render("home/search-booked-room", { isEmpty: empty, bookedRooms: bookedRooms, isAuth: req.user });
        } else {
            if (req.url == "/search-booked-rooms") {
                res.render("home/search-booked-room", { isEmpty: false, isAuth: req.user });
            } else {
                res.render("home/search-booked-room", { isEmpty: false, err: "Please fill completely your phone and your ID", isAuth: req.user });
            }

        }

    }


    // [GET] /elements
    async elements(req, res, next) {
        res.render("home/elements", {isAuth: req.user});
    }

    // [GET] /blog
    async blog(req, res, next) {
        res.render("home/blog", {isAuth: req.user});
    }

    // [GET] /contact
    async contact(req, res, next) {
        res.render("home/contact", {isAuth: req.user});
    }

    // [GET] /about-us
    async aboutUs(req, res, next) {
        res.render("home/about-us", {isAuth: req.user});
    }

}
module.exports = new HomeController;