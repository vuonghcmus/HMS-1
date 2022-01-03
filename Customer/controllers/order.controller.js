const serviceService = require("../services/service/service.service");

class ServiceController {
    //[GET] /order/
    async show(req, res, next) {
        if (!req.session.cart || req.session.cart.rooms.length <= 0) {
            return res.redirect('/rooms')
        }

        const { rooms } = req.session.cart
        console.log('rooms', rooms)

        for (const room of rooms) {
            console.log(room.listRoom)
        }

        res.render("orders/order", {
            rooms: rooms
        });


    }

}
module.exports = new ServiceController;