const Customer = require("../models/account/customer.model");
const Room = require("../models/room/room.model");
const DetailOrderRoom = require("../models/order/detailOrderRoom.model");
const OrderRoom = require("../models/order/orderRoom.model");
const Service = require("../models/service/service.model");
const DetailOrderService = require("../models/order/detailOrderService.model");

module.exports = {
  getAllCustomer: async (req, res) => {
    const customers = await Customer.find({ status: true });
    let info = [];
    for (let i = 0; i < customers.length; i++) {
      let rooms = [];
      let services = [];

      let orderRoomCustomer = await OrderRoom.find({
        customerID: customers[i]._id,
      });
      const username = customers[i].username;
      const fullname = customers[i].fullname;

      for (let j = 0; j < orderRoomCustomer[0].detailOrderRoom.length; j++) {
        let detailOrderRoom = await DetailOrderRoom.findById(
          orderRoomCustomer[0].detailOrderRoom[j]
        );
        let room = await Room.findById(detailOrderRoom.roomID);
        rooms.push({
          room,
          detailOrderRoom,
        });
        for (let k = 0; k < detailOrderRoom.detailOrderService.length; k++) {
          let detailOrderService = await DetailOrderService.findById(
            detailOrderRoom.detailOrderService[k]
          );
          let service = await Service.findById(detailOrderService.serviceID);
          services.push({
            service,
            detailOrderService,
          });
        }
      }
      info.push({
        username,
        fullname,
        rooms,
        services,
      });
    }
    const page = req.query.page || 1;
    if (page < 1) {
      page = 1;
    }
    const perPage = 1;
    const start = (page - 1) * perPage;
    const end = page * perPage;
    const totalPage = Math.ceil(info.length / perPage);

    let isCurrentPage;
    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
      if (i === +page) {
        isCurrentPage = true;
      } else {
        isCurrentPage = false;
      }
      pages.push({
        page: i,
        isCurrentPage: isCurrentPage,
      });
    }
    res.render("customer/list-customer", {
      info: info.slice(start, end),
      pages,
      isNextPage: page < totalPage,
      isPreviousPage: page > 1,
      nextPage: +page + 1,
      previousPage: +page - 1,
    });

    // res.send(info);
  },
};
