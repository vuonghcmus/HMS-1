const Room = require("../models/room/room.model");
const DetailOrderRoom = require("../models/order/detailOrderRoom.model");
const OrderRoom = require("../models/order/orderRoom.model");
const Customer = require("../models/account/customer.model");
const Service = require("../models/service/service.model");

module.exports = {
  // showListRoom: async (req, res) => {
  //   let perPage = 3; // số lượng sản phẩm xuất hiện trên 1 page
  //   let page = req.query.page || 1; // số page hiện tại
  //   if (page < 1) {
  //     page = 1;
  //   }

  //   const detailOrderRooms = await DetailOrderRoom.aggregate([
  //     {
  //       $lookup: {
  //         from: "Room",
  //         localField: "roomID",
  //         foreignField: "_id",
  //         as: "orderRoom",
  //       },
  //     },
  //     {
  //       $lookup: {
  //         from: "DetailOrderService",
  //         localField: "roomID",
  //         foreignField: "roomID",
  //         as: "orderService",
  //       },
  //     },
  //   ]);
  //   let information = [];
  //   for (let i = 0; i < detailOrderRooms.length; i++) {
  //     let orderRoom = await OrderRoom.find({
  //       detailOrderRoom: detailOrderRooms[i]._id,
  //     });

  //     let room = await Room.findById(detailOrderRooms[i].roomID);

  //     let serviceInfo = [];
  //     for (let j = 0; j < detailOrderRooms[i].orderService.length; j++) {
  //       let service = await Service.findById(
  //         detailOrderRooms[i].orderService[j].serviceID
  //       );
  //       serviceInfo.push({
  //         name: service.name || "rong",
  //         price: service.price || "rong",
  //         image: service.image || "rong",
  //       });
  //       // console.log(service);
  //     }

  //     let customer = await Customer.findById(orderRoom[0].customerID);
  //     information.push({
  //       nameCustomer: customer.fullname,
  //       phoneCustomer: customer.phone,
  //       dateCheckIn: detailOrderRooms[i].dateOfCheckIn,
  //       dateCheckOut: detailOrderRooms[i].dateOfCheckOut,
  //       ID: customer.ID,
  //       roomNumber: room.roomNumber,
  //       serviceInfo: serviceInfo,
  //     });
  //   }

  //   console.log(information);
  //   res.render("room/list-room", {
  //     information: information,
  //   });
  //   // res.send(rooms[0].orderRoom);

  //   // Room.find() // find tất cả các data
  //   //   .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
  //   //   .limit(perPage)
  //   //   .exec((err, room) => {
  //   //     Room.countDocuments((err, count) => {
  //   //       // đếm để tính có bao nhiêu trang
  //   //       if (err) return next(err);
  //   //       let isCurrentPage;
  //   //       const pages = [];
  //   //       for (let i = 1; i <= Math.ceil(count / perPage); i++) {
  //   //         if (i === +page) {
  //   //           isCurrentPage = true;
  //   //         } else {
  //   //           isCurrentPage = false;
  //   //         }
  //   //         pages.push({
  //   //           page: i,
  //   //           isCurrentPage: isCurrentPage,
  //   //         });
  //   //       }
  //   //       res.render("room/list-room", {
  //   //         room,
  //   //         pages,
  //   //         isNextPage: page < Math.ceil(count / perPage),
  //   //         isPreviousPage: page > 1,
  //   //         nextPage: +page + 1,
  //   //         previousPage: +page - 1,
  //   //       });
  //   //     });
  //   //   });
  // },
  showListRoom: async (req, res) => {
    const detailOrderRooms = await DetailOrderRoom.aggregate([
      {
        $lookup: {
          from: "Room",
          localField: "roomID",
          foreignField: "_id",
          as: "orderRoom",
        },
      },
      {
        $lookup: {
          from: "DetailOrderService",
          localField: "roomID",
          foreignField: "roomID",
          as: "orderService",
        },
      },
    ]);
    let information = [];
    for (let i = 0; i < detailOrderRooms.length; i++) {
      let orderRoom = await OrderRoom.find({
        detailOrderRoom: detailOrderRooms[i]._id,
      });

      let room = await Room.findById(detailOrderRooms[i].roomID);

      let serviceInfo = [];
      for (let j = 0; j < detailOrderRooms[i].orderService.length; j++) {
        let service = await Service.findById(
          detailOrderRooms[i].orderService[j].serviceID
        );
        serviceInfo.push({
          name: service.name || "rong",
          price: service.price || "rong",
          image: service.image || "rong",
        });
        // console.log(service);
      }

      let customer = await Customer.findById(orderRoom[0].customerID);
      information.push({
        nameCustomer: customer.fullname,
        phoneCustomer: customer.phone,
        dateCheckIn: detailOrderRooms[i].dateOfCheckIn,
        dateCheckOut: detailOrderRooms[i].dateOfCheckOut,
        ID: customer.ID,
        roomNumber: room.roomNumber,
        serviceInfo: serviceInfo,
      });
    }

    const page = req.query.page || 1;
    if (page < 1) {
      page = 1;
    }
    const perPage = 1;
    const start = (page - 1) * perPage;
    const end = page * perPage;
    const totalPage = Math.ceil(information.length / perPage);

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

    // res.send(detailOrderRooms);
    res.render("room/list-room", {
      information: information.slice(start, end),
      pages,
      isNextPage: page < totalPage,
      isPreviousPage: page > 1,
      nextPage: +page + 1,
      previousPage: +page - 1,
    });
  },
};
