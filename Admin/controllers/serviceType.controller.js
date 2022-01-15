const ServiceType = require("../models/service/serviceType.model");
const Service = require("../models/service/service.model");

module.exports = {
  showListServiceType: async (req, res) => {
    let perPage = 2; // số lượng sản phẩm xuất hiện trên 1 page
    let page = req.query.page || 1; // số page hiện tại
    if (page < 1) {
      page = 1;
    }

    ServiceType.find() // find tất cả các data
      .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)
      .exec((err, serviceTypes) => {
        ServiceType.countDocuments(async (err, count) => {
          // đếm để tính có bao nhiêu trang
          if (err) return next(err);
          const listServices = [];

          for (let i = 0; i < serviceTypes.length; i++) {
            const _service = await Service.find({
              _id: { $in: serviceTypes[i].services },
            });

            listServices.push(_service);
          }
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
          res.render("service-type/list-service-type", {
            serviceTypes,
            pages,
            isNextPage: page < Math.ceil(count / perPage),
            isPreviousPage: page > 1,
            nextPage: +page + 1,
            previousPage: +page - 1,
            services: listServices,
            length: listServices.length,
          });
        });
      });
  },
  editServiceTypeGet: (req, res) => {
    ServiceType.findById(req.params.id, (err, serviceType) => {
      if (err) {
        console.log(err);
      } else {
        res.render("service-type/edit-service-type", {
          serviceType,
        });
      }
    });
  },
  editServiceTypePost: async (req, res) => {
    const serviceType = await ServiceType.findById(req.body.id);
    serviceType.name = req.body.name;
    serviceType.description = req.body.description;
    serviceType.image = req.body.urlImage;
    serviceType.save();
    const listServices = serviceType.services;
    for (let i = 0; i < listServices.length; i++) {
      const service = await Service.findById(listServices[i]);
      service.type = req.body.name;
      service.save();
    }
    res.redirect("/service-type?page=1");
  },
  deleteServiceType: async (req, res) => {
    const serviceType = await ServiceType.findById(req.params.id);
    const listServices = serviceType.services;

    for (let i = 0; i < listServices.length; i++) {
      await Service.findByIdAndDelete(listServices[i]);
    }

    await ServiceType.findByIdAndDelete(req.params.id);
    res.redirect("/service-type?page=1");
  },
  addServiceTypePost: (req, res) => {
    const serviceType = new ServiceType({
      name: req.body.name,
      description: req.body.description,
      image: req.body.urlImage,
      services: [],
    });

    serviceType.save((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/service-type?page=1");
      }
    });
  },
};
