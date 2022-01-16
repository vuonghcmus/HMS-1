const Staff = require("../models/account/staff.model");
const bcrypt = require("bcrypt");

module.exports = {
  getAllStaff: (req, res, next) => {
    let perPage = 1; // số lượng sản phẩm xuất hiện trên 1 page
    let page = req.query.page || 1; // số page hiện tại
    if (page < 1) {
      page = 1;
    }

    var username = req.query.username

    if(username == ""){
      res.redirect("/staff?page="+page)
    }
    else{
      if(!username){
        username = ""
      }

    Staff.find({
      "username": {
        $regex: username,
        $options: 'mi'
      }
    }) // find tất cả các data
      .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)
      .exec((err, account) => {
        Staff.countDocuments({
          "username": {
            $regex: username,
            $options: 'mi'
          }
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
          res.render("staff/list-staff", {
            account,
            pages,
            isNextPage: page < Math.ceil(count / perPage),
            isPreviousPage: page > 1,
            nextPage: +page + 1,
            previousPage: +page - 1,
            username
          });
        });
      });
    }
  },
  addStaff: async (req, res) => {
    // check if username is exist using await
    const checkUsername = await Staff.findOne({ username: req.body.username });
    if (checkUsername) {
      return res.render("staff/add-staff", {
        error: "Username đã tồn tại",
      });
    }

    // check if email is exist using await
    const checkEmail = await Staff.findOne({ email: req.body.email });
    if (checkEmail) {
      return res.render("staff/add-staff", {
        error: "Email đã tồn tại",
      });
    }

    // hash password
    const hash = bcrypt.hashSync(req.body.password.toString(), 10);

    const newStaff = new Staff({
      username: req.body.username,
      password: hash,
      fullname: req.body.name,
      birthday: req.body.birthday,
      phone: req.body.phone,
      email: req.body.email,
      bankAccountNumber: req.body.bank_number,
      ID: req.body.id,
      status: true,
    });
    newStaff.save((err) => {
      if (err) return next(err);
      return res.redirect("/staff?page=1");
    });
  },
  editStaffGet: (req, res) => {
    Staff.findById(req.params.id, (err, staff) => {
      if (err) return next(err);
      res.render("staff/edit-staff", {
        staff,
      });
    });
  },
  editStaffPost: async (req, res) => {
    // check if email is exist using await
    const checkEmail = await Staff.findOne({ email: req.body.email });
    // find staff by id and update using await
    const staff = await Staff.findById(req.body._id);
    if (checkEmail) {
      return res.render("staff/edit-staff", {
        error: "Email đã tồn tại",
        staff,
      });
    }

    staff.fullname = req.body.name;
    staff.birthday = req.body.birthday;
    staff.phone = req.body.phone;
    staff.email = req.body.email;
    staff.bankAccountNumber = req.body.bank_number;
    staff.ID = req.body.ID;
    staff.save((err) => {
      if (err) return next(err);
      return res.redirect("/staff?page=1");
    });
  },

  blockStaff: (req, res) => {
    Staff.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status: false,
        },
      },
      (err, account) => {
        if (err) return next(err);
        res.redirect("/staff?page=1");
      }
    );
  },
  unblockStaff: (req, res) => {
    Staff.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          status: true,
        },
      },
      (err, account) => {
        if (err) return next(err);
        res.redirect("/staff?page=1");
      }
    );
  },
  deleteStaff: (req, res) => {
    Staff.findByIdAndDelete(req.params.id, (err, account) => {
      if (err) return next(err);
      res.redirect("/staff?page=1");
    });
  },
};
