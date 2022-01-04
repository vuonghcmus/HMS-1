const DetailOrderRoom = require("../models/order/detailOrderRoom.model");
const Customer = require("../models/account/customer.model");
const RoomType = require("../models/room/roomType.model");
const DetailOrderService = require("../models/order/detailOrderService.model");
const Service = require("../models/service/service.model");

// show list room using
const showListRoomUsing = async (req, res) => {
  let perPage = 2; // số lượng sản phẩm xuất hiện trên 1 page
  let page = req.query.page || 1; // số page hiện tại
  if (page < 1) {
    page = 1;
  }

  // find data by status 'using' and skip and limit
  DetailOrderRoom.find({ status: "using" })
    .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
    .limit(perPage)
    .exec((err, detailOrderRoom) => {
      DetailOrderRoom.countDocuments(
        { status: "using" },
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
                _id: { $in: detailOrderRoom[i].detailOrderService },
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

          res.render("room-type/list-room-using", {
            detailOrderRoom,
            pages,
            isNextPage: page < Math.ceil(count / perPage),
            isPreviousPage: page > 1,
            nextPage: +page + 1,
            previousPage: +page - 1,
            orderServices: listOrderServices,
            length: listOrderServices.length,
          });
        }
      );
    });
};

// show list room empty
const showListRoomEmpty = async (req, res) => {
  let perPage = 2; // số lượng sản phẩm xuất hiện trên 1 page
  let page = req.query.page || 1; // số page hiện tại
  if (page < 1) {
    page = 1;
  }

  // find data by status 'using' and skip and limit
  DetailOrderRoom.find({ status: "done" })
    .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
    .limit(perPage)
    .exec((err, detailOrderRoom) => {
      DetailOrderRoom.countDocuments({ status: "done" }, async (err, count) => {
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

        for (let i = 0; i < detailOrderRoom.length; i++) {
          const roomType = await RoomType.findById(
            detailOrderRoom[i].roomTypeID
          );
          detailOrderRoom[i].roomTypeName = roomType.name;
        }

        res.render("room-type/list-room-done", {
          detailOrderRoom,
          pages,
          isNextPage: page < Math.ceil(count / perPage),
          isPreviousPage: page > 1,
          nextPage: +page + 1,
          previousPage: +page - 1,
        });
      });
    });
};

const showListRoomPending = async (req, res) => {
  let perPage = 2; // số lượng sản phẩm xuất hiện trên 1 page
  let page = req.query.page || 1; // số page hiện tại
  if (page < 1) {
    page = 1;
  }

  // find data by status 'using' and skip and limit
  DetailOrderRoom.find({ status: "pending" })
    .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
    .limit(perPage)
    .exec((err, detailOrderRoom) => {
      DetailOrderRoom.countDocuments(
        { status: "pending" },
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
          }

          res.render("room-type/list-room-pending", {
            detailOrderRoom,
            pages,
            isNextPage: page < Math.ceil(count / perPage),
            isPreviousPage: page > 1,
            nextPage: +page + 1,
            previousPage: +page - 1,
          });
        }
      );
    });
};

module.exports = {
  showListRoom: async (req, res) => {
    const status = req.query.status;
    if (status == "using") {
      return showListRoomUsing(req, res);
    } else if (status == "done") {
      return showListRoomEmpty(req, res);
    } else if (status == "pending") {
      return showListRoomPending(req, res);
    }
  },
};
