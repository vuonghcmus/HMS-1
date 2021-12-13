const Customer = require("../models/account/Customer.model");

module.exports = {
  getAllCustomers: (req, res, next) => {
    let perPage = 8; // số lượng sản phẩm xuất hiện trên 1 page
    let page = req.params.page || 1;

    Customer.find() // find tất cả các data
      .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)
      .exec((err, account) => {
        Customer.countDocuments((err, count) => {
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
          res.render("account/list-account", {
            account,
            pages,
            isNextPage: page < Math.ceil(count / perPage),
            isPreviousPage: page > 1,
            nextPage: +page + 1,
            previousPage: +page - 1,
          });
        });
      });
  },
  addAccount: (req, res) => {
    const { name, email, password, address } = req.body;
    const newCustomer = new Customer({
      name,
      email,
      password,
      address,
      status: true,
    });
    newCustomer.save((err) => {
      if (err) return next(err);
      res.redirect("/account/list-account/1");
    });
  },
  editAccountGet: (req, res) => {
    Customer.findById(req.params.id, (err, account) => {
      if (err) return next(err);
      res.render("account/edit-account", {
        account,
      });
    });
  },
  editAccountPost: (req, res) => {
    Customer.findByIdAndUpdate(
      req.body.id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.phone,
          address: req.body.address,
        },
      },
      (err, account) => {
        if (err) return next(err);
        res.redirect("/account/list-account/1");
      }
    );
  },
  blockAccount: (req, res) => {
    Customer.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status: false,
        },
      },
      (err, account) => {
        if (err) return next(err);
        res.redirect("/account/list-account/1");
      }
    );
  },
  unblockAccount: (req, res) => {
    Customer.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status: true,
        },
      },
      (err, account) => {
        if (err) return next(err);
        res.redirect("/account/list-account/1");
      }
    );
  },
  deleteAccount: (req, res) => {
    Customer.findByIdAndDelete(req.params.id, (err, account) => {
      if (err) return next(err);
      res.redirect("/account/list-account/1");
    });
  },
};
