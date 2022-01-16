const Service = require("../models/service/service.model");
const DetailOrderService = require("../models/order/detailOrderService.model");
const DetailOrderRoom = require("../models/order/detailOrderRoom.model");

module.exports = {
  showListService: (req, res) => {
    let perPage = 4; // số lượng sản phẩm xuất hiện trên 1 page
    let page = req.query.page || 1; // số page hiện tại
    if (page < 1) {
      page = 1;
    }

    var name = req.query.name;
    if (name == "") {
      res.redirect("/service?page=" + page);
    } else {
      if (!name) {
        name = "";
      }

      Service.find({
        name: {
          $regex: name,
          $options: "mi",
        },
      }) // find tất cả các data
        .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
        .limit(perPage)
        .exec((err, service) => {
          Service.countDocuments(
            {
              name: {
                $regex: name,
                $options: "mi",
              },
            },
            (err, count) => {
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
              res.render("service/list-service", {
                service,
                pages,
                isNextPage: page < Math.ceil(count / perPage),
                isPreviousPage: page > 1,
                nextPage: +page + 1,
                previousPage: +page - 1,
                name,
              });
            }
          );
        });
    }
  },

  showServicePending: async (req, res) => {
    let perPage = 2; // số lượng sản phẩm xuất hiện trên 1 page
    let page = req.query.page || 1; // số page hiện tại
    if (page < 1) {
      page = 1;
    }

    var name = req.query.name;

    if (name == "") {
      res.redirect("/service?status=pending&page=" + page);
    } else {
      if (!name) {
        name = "";
      }

      const service = await Service.find({
        name: {
          $regex: name,
          $options: "mi",
        },
      });

      var serviceIdList = [];
      for (var i = 0; i < service.length; i++) {
        serviceIdList.push(service[i]._id);
      }

      DetailOrderService.find({
        $and: [
          {
            serviceID: {
              $in: serviceIdList,
            },
          },
          {
            status: "pending",
          },
        ],
      })
        .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
        .limit(perPage)
        .exec((err, detailOrderService) => {
          DetailOrderService.countDocuments(
            {
              $and: [
                {
                  serviceID: {
                    $in: serviceIdList,
                  },
                },
                {
                  status: "pending",
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


              const info = [];
              for (let i = 0; i < detailOrderService.length; i++) {
                const detailOrderRoom = await DetailOrderRoom.find({
                  detailOrderService: detailOrderService[i]._id,
                });
                const service = await Service.findById(
                  detailOrderService[i].serviceID
                );
                info.push({
                  roomID: detailOrderRoom[0].roomID,
                  serviceName: service.name,
                  servicePrice: service.price,
                  serviceImage: service.image,
                  number: detailOrderService[i].number,
                  orderDate: detailOrderService[i].orderDate,
                  id: detailOrderService[i]._id,
                });
              }
              //   res.send(info);

              res.render("service/list-service-pending", {
                info,
                pages,
                isNextPage: page < Math.ceil(count / perPage),
                isPreviousPage: page > 1,
                nextPage: +page + 1,
                previousPage: +page - 1,
                length: info.length,
                name,
              });
            }
          );
        });
    }
  },

  acceptOrderService: (req, res) => {
    // find detailOrderRoom by id and update status
    DetailOrderService.findById(
      req.params.id,
      async (err, detailOrderService) => {
        if (err) return next(err);

        detailOrderService.status = "using";
        detailOrderService.save((err) => {
          if (err) {
            return res.status(500).json({
              status: "fail",
              message: "Accept order service fail",
            });
          }
          return res.status(201).json(detailOrderService);
        });
      }
    );
  },
  rejectOrderService: (req, res) => {
    DetailOrderService.findById(
      req.params.id,
      async (err, detailOrderService) => {
        if (err) return next(err);

        detailOrderService.status = "reject";
        detailOrderService.save((err) => {
          if (err) {
            return res.status(500).json({
              status: "fail",
              message: "Reject order service fail",
            });
          }
          return res.status(201).json(detailOrderService);
        });
      }
    );
  },
};
