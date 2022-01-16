const Customer = require("../models/account/customer.model");
const DetailOrderRoom = require("../models/order/detailOrderRoom.model");
const Service = require("../models/service/service.model");
const DetailOrderService = require("../models/order/detailOrderService.model");
const RoomType = require("../models/room/roomType.model");

const showCustomer = async (req, res) => {
  const status = req.query.status;
  let perPage = 2; // số lượng sản phẩm xuất hiện trên 1 page
  let page = req.query.page || 1; // số page hiện tại
  if (page < 1) {
    page = 1;
  }

  var name = req.query.name;

  if (name == "") {
    res.redirect("/customer?status=" + status + "&page=" + page);
  } else {
    if (!name) {
      name = "";
    }
    const customer = await Customer.find({
      fullname: {
        $regex: name,
        $options: "mi",
      },
    });
    var customerIdList = [];
    for (var i = 0; i < customer.length; i++) {
      customerIdList.push(customer[i]._id);
    }

    DetailOrderRoom.find({
      $and: [
        {
          customerID: {
            $in: customerIdList,
          },
        },
        {
          status: status,
        },
      ],
    })
      .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)
      .exec((err, detailOrderRoom) => {
        DetailOrderRoom.countDocuments(
          {
            $and: [
              {
                customerID: {
                  $in: customerIdList,
                },
              },
              {
                status: status,
              },
            ],
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
                    $in: detailOrderRoom[i].detailOrderService,
                  },
                });

                for (let j = 0; j < _orderService.length; j++) {
                  const service = await Service.findById(
                    _orderService[j].serviceID
                  );
                  _orderService[j].serviceName = service.name;
                  _orderService[j].serviceImage = service.image;
                }

                listOrderServices.push(_orderService);
              } else {
                listOrderServices.push([]);
              }
            }
            if (status === "pending") {
              res.render("customer/list-customer-pending", {
                detailOrderRoom,
                pages,
                isNextPage: page < Math.ceil(count / perPage),
                isPreviousPage: page > 1,
                nextPage: +page + 1,
                previousPage: +page - 1,
                orderServices: listOrderServices,
                length: listOrderServices.length,
                name: name,
              });
            } else {
              res.render("customer/list-customer-using", {
                detailOrderRoom,
                pages,
                isNextPage: page < Math.ceil(count / perPage),
                isPreviousPage: page > 1,
                nextPage: +page + 1,
                previousPage: +page - 1,
                orderServices: listOrderServices,
                length: listOrderServices.length,
                name: name,
              });
            }
          }
        );
      });
  }
};

module.exports = {
  showAllCustomer: async (req, res) => {
    return showCustomer(req, res);
  },
  acceptOrderRoom: (req, res) => {
    // find detailOrderRoom by id and update status
    DetailOrderRoom.findById(req.params.id, async (err, detailOrderRoom) => {
      if (err) return next(err);

      // Unlock for customer account if account was loocked
      await Customer.findByIdAndUpdate(detailOrderRoom.customerID, {
        status: true,
      });

      detailOrderRoom.status = "using";
      detailOrderRoom.dateOfCheckIn = new Date();
      detailOrderRoom.save((err) => {
        if (err) {
          return res.status(500).json({
            status: "fail",
            message: "Accept order room fail",
          });
        }
        return res.status(201).json(detailOrderRoom);
      });
    });
  },
  rejectOrderRoom: (req, res) => {
    // find detailOrderRoom by id and delete
    // DetailOrderRoom.findByIdAndDelete(req.params.id, (err, detailOrderRoom) => {
    //   if (err) {
    //     return res.status(500).json({
    //       status: "fail",
    //       message: "Reject order room fail",
    //     });
    //   }
    //   return res.status(201).json(detailOrderRoom);
    // });

    DetailOrderRoom.findById(req.params.id, async (err, detailOrderRoom) => {
      if (err) return next(err);

      detailOrderRoom.status = "reject";
      detailOrderRoom.save((err) => {
        if (err) {
          return res.status(500).json({
            status: "fail",
            message: "Reject order room fail",
          });
        }
        return res.status(201).json(detailOrderRoom);
      });
    });
  },
};
