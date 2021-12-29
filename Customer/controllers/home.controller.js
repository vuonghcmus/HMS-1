const HomeService = require("../services/home/home.service");
class HomeController {
    //[GET] /
    async show(req, res, next) {
        res.render("home/home", {
            active: { home: true }
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
            res.render("home/search-booked-room", { isEmpty: empty, bookedRooms: bookedRooms });
        } else {
            if (req.url == "/search-booked-rooms") {
                res.render("home/search-booked-room", { isEmpty: false });
            } else {
                res.render("home/search-booked-room", { isEmpty: false, err: "Please fill completely your phone and your ID" });
            }

        }

    }

    //[POST] /search-order
    async postSearch(req, res, next) {
        res.render("home/search-booked-room");
    }

    // [GET] /elements
    async elements(req, res, next) {
        res.render("home/elements");
    }

    // [GET] /blog
    async blog(req, res, next) {
        res.render("home/blog");
    }

    // [GET] /contact
    async contact(req, res, next) {
        res.render("home/contact", {
            active: { contact: true }
        });
    }

    // [GET] /about-us
    async aboutUs(req, res, next) {
        res.render("home/about-us");
    }

}
module.exports = new HomeController;