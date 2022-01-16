const Service = require("../models/service/service.model");
const ServiceType = require("../models/service/serviceType.model");

module.exports = {
  showListService: (req, res) => {
    let perPage = 3; // số lượng sản phẩm xuất hiện trên 1 page
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
        Service.countDocuments({
          name: {
            $regex: name,
            $options: "mi",
          },
        }, (err, count) => {
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
            name
          });
        });
      });
    }
  },
  addServiceGet: async (req, res) => {
    const serviceType = await ServiceType.find({});
    res.render("service/add-service", {
      serviceType,
    });
  },
  //add service post and add service id to type of service
  addServicePost: async (req, res) => {
    const service = new Service({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.urlImage,
      type: req.body.selectedServiceType,
    });

    service.save((err) => {
      if (err) {
        console.log(err);
        res.render("service/add-service", {
          msg: err,
        });
      } else {
        ServiceType.findByIdAndUpdate(
          req.body.serviceType,
          {
            $push: {
              services: service._id,
            },
          },
          (err, cha) => {
            if (err) {
              console.log(err);
            } else {
              res.redirect("/service?page=1");
            }
          }
        );
      }
    });
  },
  // edit service and find current id category of this Service
  editServiceGet: async (req, res) => {
    const service = await Service.findById(req.params.id);
    const serviceType = await ServiceType.find({});
    res.render("service/edit-service", {
      service,
      serviceType,
    });
  },
  // edit service post and remove service id to old type of service
  // and push service id to new type of service
  // using async await
  editServicePost: async (req, res) => {
    const currentServiceType = await ServiceType.find({
      services: req.body.id,
    }).clone();

    const _service = await Service.findByIdAndUpdate(
      req.body.id,
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          image: req.body.urlImage,
          type: req.body.selectedServiceType,
        },
      },
      async (err, service) => {
        if (err) return next(err);

        await ServiceType.findByIdAndUpdate(
          currentServiceType[0]._id,
          {
            $pull: {
              services: service._id,
            },
          },
          async (err, cha) => {
            if (err) {
              console.log(err);
            } else {
              await ServiceType.findByIdAndUpdate(
                req.body.serviceType,
                {
                  $addToSet: {
                    services: service._id,
                  },
                },
                (err) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.redirect("/service?page=1");
                  }
                }
              ).clone();
            }
          }
        ).clone();
      }
    ).clone();
  },
  // delete service and remove service id to type of service
  deleteService: async (req, res) => {
    Service.findByIdAndDelete(req.params.id, async (err, service) => {
      if (err) return next(err);

      const currentServiceType = await ServiceType.find({
        services: req.params.id,
      }).clone();
      // find category and remove Service id
      await ServiceType.findByIdAndUpdate(
        currentServiceType[0]._id,
        {
          $pull: {
            services: req.params.id,
          },
        },
        (err, cha) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect("/service?page=1");
          }
        }
      ).clone();
    }).clone();
  },
};
