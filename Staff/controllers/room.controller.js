const DetailOrderRoom = require("../models/order/detailOrderRoom.model");
const Customer = require("../models/account/customer.model");
const RoomType = require("../models/room/roomType.model");
const DetailOrderService = require("../models/order/detailOrderService.model");
const Service = require("../models/service/service.model");

// show list room using
const showListRoom = async (req, res) => {
  let perPage = 2; // số lượng sản phẩm xuất hiện trên 1 page
  let page = req.query.page || 1; // số page hiện tại
  if (page < 1) {
    page = 1;
  }

  const status = req.query.status;
  var room = req.query.room;

  if (room == "") {
    res.redirect("/room?status=" + status + "&page=" + page)
  } else {
    if (!room) {
      room = ""
    }
    // find data by status 'using' and skip and limit
    DetailOrderRoom.find({
        $and: [{
            roomID: {
              $regex: room,
              $options: 'mi'
            }
          },
          {
            status: status
          }
        ]
      })
      .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)
      .exec((err, detailOrderRoom) => {
        DetailOrderRoom.countDocuments({
            $and: [{
                roomID: {
                  $regex: room,
                  $options: 'mi'
                }
              },
              {
                status: status
              }
            ]
          },
          async (err, count) => {
            // đếm để tính có bao nhiêu trang
            if (err) return next(err);

            let isCurrentPage;
            const pages = [];
            for (let i = 1; i <= Math.ceil(count / perPage); i++) {
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
            const listOrderServices = [];
            for (let i = 0; i < detailOrderRoom.length; i++) {
              const customer = await Customer.findById(
                detailOrderRoom[i].customerID
              );
              const roomType = await RoomType.findById(
                detailOrderRoom[i].roomTypeID
              );
              detailOrderRoom[i].customerName = customer.fullname;
              detailOrderRoom[i].customerPhone = customer.phone;
              detailOrderRoom[i].customerId = customer.ID;
              detailOrderRoom[i].roomTypeName = roomType.name;

              if (detailOrderRoom[i].detailOrderService.length > 0) {
                const _orderService = await DetailOrderService.find({
                  _id: {
                    $in: detailOrderRoom[i].detailOrderService
                  },
                });

                const _service = await Service.findById(
                  _orderService[0].serviceID
                );

                _orderService[0].serviceName = _service.name;
                _orderService[0].serviceImage = _service.image;
                listOrderServices.push(_orderService);
              } else {
                listOrderServices.push([]);
              }
            }

            if (status == "pending") {
              res.render("room-type/list-room-pending", {
                detailOrderRoom,
                pages,
                isNextPage: page < Math.ceil(count / perPage),
                isPreviousPage: page > 1,
                nextPage: +page + 1,
                previousPage: +page - 1,
                room,
              });
            } else {
              res.render("room-type/list-room-using", {
                detailOrderRoom,
                pages,
                isNextPage: page < Math.ceil(count / perPage),
                isPreviousPage: page > 1,
                nextPage: +page + 1,
                previousPage: +page - 1,
                orderServices: listOrderServices,
                length: listOrderServices.length,
                room,
              });
            }
          }
        );
      });
  }
};

// show list room empty
const showListRoomEmpty = async (req, res) => {
  const perPage = 10;
  const page = req.query.page || 1;
  if (page < 1) {
    page = 1;
  }
  var room = req.query.room
  if (room == "") {
    res.redirect("/room?status=empty&page=" + page)
  } else {
    if(!room){
      room = ""
    }
    // find all rom type using await
    const roomType = await RoomType.find({});
    const listRooms = [];
    for (let i = 0; i < roomType.length; i++) {
      for (let j = 0; j < roomType[i].rooms.length; j++) {
        if(roomType[i].rooms[j].includes(room)){
          listRooms.push(roomType[i].rooms[j]);
        }
      }
    }
    const detailOrderRoom = await DetailOrderRoom.find({
      $or: [{
        status: "pending"
      }, {
        status: "using"
      }]
    });

    const listRoomUsing = [];
    for (let i = 0; i < detailOrderRoom.length; i++) {
      listRoomUsing.push(detailOrderRoom[i].roomID);
    }
    let listRoomEmpty = [];

    for (let i = 0; i < listRooms.length; i++) {
      if (!listRoomUsing.includes(listRooms[i])) {
        listRoomEmpty.push(listRooms[i]);
      }
    }

    const page = req.query.page || 1;
    if (page < 1) {
      page = 1;
    }
    const perPage = 10;
    const start = (page - 1) * perPage;
    const end = page * perPage;
    const length = Math.ceil(listRoomEmpty.length / perPage);
    listRoomEmpty = listRoomEmpty.slice(start, end);

    const info = [];
    const lengthOfRoomEmpty = listRoomEmpty.length;
    for (let i = 0; i < lengthOfRoomEmpty; i++) {
      // find room type that have roomID in rooms
      const roomType = await RoomType.find({
        rooms: {
          $in: [listRoomEmpty[i]]
        },
      });
      info.push({
        roomID: listRoomEmpty[i],
        roomTypeName: roomType[0].name,
        roomPrice: roomType[0].price,
      });
    }

    const pages = [];
    for (let i = 1; i <= length; i++) {
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
    res.render("room-type/list-room-empty", {
      pages,
      isNextPage: page < length,
      isPreviousPage: page > 1,
      nextPage: +page + 1,
      previousPage: +page - 1,
      info,
      room
    });
  }

};

// const showListRoomPending = async (req, res) => {
//   let perPage = 2; // số lượng sản phẩm xuất hiện trên 1 page
//   let page = req.query.page || 1; // số page hiện tại
//   if (page < 1) {
//     page = 1;
//   }

//   // find data by status 'using' and skip and limit
//   DetailOrderRoom.find({
//       status: "pending"
//     })
//     .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
//     .limit(perPage)
//     .exec((err, detailOrderRoom) => {
//       DetailOrderRoom.countDocuments({
//           status: "pending"
//         },
//         async (err, count) => {
//           // đếm để tính có bao nhiêu trang
//           if (err) return next(err);

//           let isCurrentPage;
//           const pages = [];
//           for (let i = 1; i <= Math.ceil(count / perPage); i++) {
//             if (i === +page) {
//               isCurrentPage = true;
//             } else {
//               isCurrentPage = false;
//             }
//             pages.push({
//               page: i,
//               isCurrentPage: isCurrentPage,
//             });
//           }

//           for (let i = 0; i < detailOrderRoom.length; i++) {
//             const customer = await Customer.findById(
//               detailOrderRoom[i].customerID
//             );
//             const roomType = await RoomType.findById(
//               detailOrderRoom[i].roomTypeID
//             );
//             detailOrderRoom[i].customerName = customer.fullname;
//             detailOrderRoom[i].customerPhone = customer.phone;
//             detailOrderRoom[i].customerId = customer.ID;
//             detailOrderRoom[i].roomTypeName = roomType.name;
//           }

//           res.render("room-type/list-room-pending", {
//             detailOrderRoom,
//             pages,
//             isNextPage: page < Math.ceil(count / perPage),
//             isPreviousPage: page > 1,
//             nextPage: +page + 1,
//             previousPage: +page - 1,
//           });
//         }
//       );
//     });
// };

module.exports = {
  showListRoom: async (req, res) => {
    const status = req.query.status;
    if (status == "empty") {
      return showListRoomEmpty(req, res);
    } else {
      return showListRoom(req, res);
    }
  },
};