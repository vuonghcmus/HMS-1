const HomeService = require("../services/home/home.service");
const RoomService = require("../services/room/roomType.service");
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
            let bookedRooms = await HomeService.getBookedRoom(phone, identity);
            for (let i = 0; i < bookedRooms.length; i++) {
                let room = await RoomService.findByRoomID(bookedRooms[i].roomID);
                console.log(room);
                if (room) {
                    bookedRooms[i].room = room;
                }
                let checkindate = bookedRooms[i].dateOfCheckIn;
                bookedRooms[i].dateOfCheckIn = checkindate.toISOString().substring(0, 10);
                let checkoutdate = bookedRooms[i].dateOfCheckOut;
                bookedRooms[i].dateOfCheckOut = checkoutdate.toISOString().substring(0, 10);

            }
            console.log(bookedRooms);
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
        res.render("home/elements", { isAuth: req.user });
    }

    // [GET] /blog
    async blog(req, res, next) {
        res.render("home/blog", { isAuth: req.user });
    }

    // [GET] /contact
    async contact(req, res, next) {
        res.render("home/contact", { isAuth: req.user });
    }

    // [GET] /about-us
    async aboutUs(req, res, next) {
        res.render("home/about-us", { isAuth: req.user });
    }
    async showHelp(req, res, next) {
        res.render("help/help");
    }

}
module.exports = new HomeController;