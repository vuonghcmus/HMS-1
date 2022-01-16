const DetailOrderRoom = require("../models/order/detailOrderRoom.model");
const DetailOrderService = require("../models/order/detailOrderService.model");

module.exports = {
    // get total revenue
    getTotalRevenue: async(req, res) => {
        const detailOrderRoom = await DetailOrderRoom.find({ status: "done" });
        let totalRoomRevenue = 0;
        let totalServiceRevenue = 0;
        for (let i = 0; i < detailOrderRoom.length; i++) {
            totalRoomRevenue += detailOrderRoom[i].price;
            for (let j = 0; j < detailOrderRoom[i].detailOrderService.length; j++) {
                const orderService = await DetailOrderService.findById(
                    detailOrderRoom[i].detailOrderService[j]
                );
                totalServiceRevenue += parseInt(orderService.price);
            }
        }
        res.render("revenue/home", {
            totalRoomRevenue,
            totalServiceRevenue,
            totalRevenue: totalRoomRevenue + totalServiceRevenue,
        });
    },


};