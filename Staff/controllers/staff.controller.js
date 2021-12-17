const Staff = require("../models/account/staff.model");
const bcrypt = require("bcrypt");
const passport = require("passport");

module.exports = {
  getLogin: (req, res, next) => {
    if (req.user) {
      return res.redirect("/");
    }

    res.render("staff/login", {
      layout: false,
    });
  },
  postLogin: (req, res, next) => {
    passport.authenticate(
      "local",
      {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
      },
      (err, staff, info) => {
        if (err) {
          return next(err);
        }

        if (!staff) {
          return res.render("staff/login", {
            layout: false,
            error: "Tài khoản hoặc mật khẩu không đúng",
          });
        }
        const retUrl = req.query.retUrl || "/";
        req.logIn(staff, (err) => {
          if (err) {
            return next(err);
          }
          return res.redirect(retUrl);
        });
      }
    )(req, res, next);
  },
  logout: (req, res, next) => {
    req.logOut();
    req.session.destroy(function (err) {
      res.redirect("/staff/login");
    });
  },
  profile: async (req, res, next) => {
    if (!req.user) {
      return res.redirect("/staff/login");
    }
    // find staff by id using await
    const staff = await Staff.findById(res.locals.authUser._id);
    return res.render("staff/profile", { id: res.locals.authUser._id, staff });
  },
  getEditProfile: async (req, res, next) => {
    if (!req.user) {
      return res.redirect("/staff/login");
    }
    // find staff by id using await
    const staff = await Staff.findById(res.locals.authUser._id);
    return res.render("staff/edit-profile", {
      id: res.locals.authUser._id,
      staff,
    });
  },
  postEditProfile: async (req, res, next) => {
    if (!req.user) {
      return res.redirect("/staff/login");
    }
    const staff = await Staff.findById(req.body._id);
    staff.username = req.body.username.toString();
    staff.fullname = req.body.fullname;
    staff.birthday = req.body.birthday;
    staff.phone = req.body.phone;
    staff.email = req.body.email;
    staff.bankAccountNumber = req.body.bankAccountNumber;
    staff.ID = req.body.ID;

    await staff.save();
    return res.redirect("/staff/profile");
  },
  getChangePassword: async (req, res, next) => {
    if (!req.user) {
      return res.redirect("/staff/login");
    }
    return res.render("staff/change-password", {
      id: res.locals.authUser._id,
    });
  },
  postChangePassword: async (req, res, next) => {
    if (!req.user) {
      return res.redirect("/staff/login");
    }
    const staff = await Staff.findById(req.body.id);
    const isMatch = bcrypt.compareSync(req.body.oldPassword, staff.password);
    if (!isMatch) {
      return res.render("staff/change-password", {
        id: res.locals.authUser._id,
        error: "Mật khẩu cũ không đúng",
      });
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.render("staff/change-password", {
        id: res.locals.authUser._id,
        error: "Mật khẩu mới không trùng khớp",
      });
    }
    const hash = bcrypt.hashSync(req.body.newPassword, 10);
    staff.password = hash;
    await staff.save();
    return res.redirect("/staff/profile");
  },
};
