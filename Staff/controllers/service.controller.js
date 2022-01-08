const Service = require("../models/service/service.model");

module.exports = {
  showListService: (req, res) => {
    let perPage = 3; // số lượng sản phẩm xuất hiện trên 1 page
    let page = req.query.page || 1; // số page hiện tại
    if (page < 1) {
      page = 1;
    }

    var name = req.query.name
    if (name == ""){
      res.redirect("/service?page=" + page)
    }
    else{
      if (!name)
    {
      name = ""
    }

    Service.find({
      "name": {
        $regex: name,
        $options: 'mi'
      }
    }) // find tất cả các data
      .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)
      .exec((err, service) => {
        Service.countDocuments({
          "name": {
            $regex: name,
            $options: 'mi'
          }
        },(err, count) => {
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
        });
      });
    }
  },
};
