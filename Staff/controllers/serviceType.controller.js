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
};
