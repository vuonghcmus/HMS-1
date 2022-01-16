const Customer = require("../models/account/customer.model");
const bcrypt = require("bcrypt");

module.exports = {
  getAllCustomer: (req, res, next) => {
    let perPage = 10; // số lượng sản phẩm xuất hiện trên 1 page
    let page = req.query.page || 1; // số page hiện tại
    if (page < 1) {
      page = 1;
    }
    var username = req.query.username

    if(username == ""){
      res.redirect("/account?page="+page)
    }
    else{
      if(!username){
        username = ""
      }

      Customer.find({
        "username": {
          $regex: username,
          $options: 'mi'
        }
      }) // find tất cả các data
      .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)
      .exec((err, customers) => {
        Customer.countDocuments({
          "username": {
            $regex: username,
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
          res.render("account/list-customer", {
            customers,
            pages,
            isNextPage: page < Math.ceil(count / perPage),
            isPreviousPage: page > 1,
            nextPage: +page + 1,
            previousPage: +page - 1,
            username,
          });
        });
      });
    }
  },
  addCustomer: async (req, res) => {
    // check if username is exist using await
    const checkUsername = await Customer.findOne({
      username: req.body.username,
    });
    if (checkUsername) {
      return res.render("account/add-customer", {
        error: "Username đã tồn tại",
      });
    }

    // check if email is exist using await
    const checkPhoneNumber = await Customer.findOne({ phone: req.body.phone });
    if (checkPhoneNumber) {
      return res.render("account/add-customer", {
        error: "Số điện thoại đã tồn tại",
      });
    }

    const checkID = await Customer.findOne({ ID: req.body.id });
    if (checkID) {
      return res.render("account/add-customer", {
        error: "ID đã tồn tại",
      });
    }

    // hash password
    const hash = bcrypt.hashSync(req.body.password.toString(), 10);

    const newCustomer = new Customer({
      username: req.body.username,
      password: hash,
      fullname: req.body.name,
      phone: req.body.phone,
      ID: req.body.id,
      status: true,
    });
    newCustomer.save((err) => {
      if (err) return next(err);
      return res.redirect("/account?page=1");
    });
  },
  editCustomerGet: (req, res) => {
    Customer.findById(req.params.id, (err, customer) => {
      if (err) return next(err);
      res.render("account/edit-customer", {
        customer,
      });
    });
  },
  editCustomerPost: async (req, res) => {
    // check if phone number is exist using await
    const checkPhoneNumber = await Customer.findOne({ phone: req.body.phone });
    const checkID = await Customer.findOne({ ID: req.body.ID });
    const customer = await Customer.findById(req.body._id);
    if (checkPhoneNumber && checkPhoneNumber.phone != req.body.phone) {
      return res.render("account/edit-customer", {
        error: "Số điện thoại đã tồn tại",
        customer,
      });
    }
    if (checkID && checkID.ID != req.body.ID) {
      return res.render("account/edit-customer", {
        error: "ID đã tồn tại",
        customer,
      });
    }

    customer.fullname = req.body.name;
    customer.phone = req.body.phone;
    customer.ID = req.body.ID;
    customer.save((err) => {
      if (err) return next(err);
      return res.redirect("/account?page=1");
    });
  },

  blockCustomer: (req, res) => {
    Customer.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status: false,
        },
      },
      (err, account) => {
        if (err) return next(err);
        res.redirect("/account?page=1");
      }
    );
  },
  unblockCustomer: (req, res) => {
    Customer.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status: true,
        },
      },
      (err, account) => {
        if (err) return next(err);
        res.redirect("/account?page=1");
      }
    );
  },

  resetPasswordCustomer: async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (customer) {
      const ID = customer.ID;
      const newPassword = bcrypt.hashSync(ID, 10);
      Customer.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            password: newPassword,
          },
        },
        (err, account) => {
          if (err) return next(err);
          res.redirect("/account?page=1");
        }
      );
    } else {
      return res.render("account/edit-customer", {
        error: "Không tìm thấy tài khoản",
        customer: null,
      });
    }
  },

  deleteCustomer: (req, res) => {
    Customer.findByIdAndDelete(req.params.id, (err, account) => {
      if (err) return next(err);
      res.redirect("/account?page=1");
    });
  },
};
