const billService = require("../services/service/service.service");
const dtorService = require("../services/order/detailOrderRoom.service");

class ApiController {
    //[GET] /services/
    async show(req, res, next) {
        const allServices = await billService.findAll();
        console.log(allServices);

        res.render("services", { allServices: allServices });
        res.send(allServices);
    }

    //[GET] /api/dtor/:checkindate/:checkoutdate
    async getDtorByInOut(req, res, next) {
        const checkindate = req.params.checkindate;
        const checkoutdate = req.params.checkoutdate;

        const dtors = await dtorService.findByDateInOut(new Date(checkindate), new Date(checkoutdate));
        var ret = [];
        for (let i = 0; i < dtors.length; i++) {
            ret.push(dtors[i].roomID);
        }
        res.send(ret);
    }
}
module.exports = new ApiController;