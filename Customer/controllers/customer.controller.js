const customerModel = require("../models/account/customer.model");
const serviceModel = require("../models/service/service.model");
const roomTypeModel = require("../models/room/roomType.model");
const detailOrderRoomModel = require("../models/order/detailOrderRoom.model");
const detailOrderServiceModel = require("../models/order/detailOrderService.model");
const { convertDate } = require("../utils/");
const bcrypt = require("bcrypt");
const passport = require("passport");
const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

module.exports = {
  show: (req, res, next) => {
    if (req.user) {
      console.log(req.user);
      return res.redirect("/");
    }

    res.render("account/sign-in", {
      layout: "main_no_head",
      retUrl: req.query.retUrl || "/",
    });
  },
  login: (req, res, next) => {
    passport.authenticate(
      "local",
      {
        successRedirect: req.query.retUrl,
        failureRedirect: "/account/sign-in",
        failureFlash: true,
      },
      (err, customer, info) => {
        if (err) {
          return next(err);
        }

        if (!customer) {
          return res.render("account/sign-in", {
            layout: "main_no_head",
            error: "Account or password is not correct",
          });
        }

        if (!customer.status) {
          return res.render("account/sign-in", {
            layout: "main_no_head",
            error: "Please check in at the hotel to activate your account",
          });
        }

        const retUrl = req.query.retUrl || "/";
        req.logIn(customer, (err) => {
          if (err) {
            return next(err);
          }
          return res.redirect(retUrl);
        });
      }
    )(req, res, next);
  },

  profile: async (req, res, next) => {
    // find all orders of current customer with status using
    const orders = await detailOrderRoomModel.find({
      customerID: req.user._id,
      status: "using",
    });
    var total = 0;

    for (let order of orders) {
      order.totalPrice = order.price;
      var detailOrderService = [];
      for (let detailServiceID of order.detailOrderService) {
        var serviceDetail = await detailOrderServiceModel
          .findById(detailServiceID)
          .lean();
        const serviceType = await serviceModel.findById(
          serviceDetail.serviceID
        );
        serviceDetail.orderDate = convertDate(
          new Date(serviceDetail.orderDate)
        );
        serviceDetail.ServiceName = serviceType.name;
        detailOrderService.push(serviceDetail);
        serviceDetail.totalPrice = serviceDetail.price * serviceDetail.number;
        order.totalPrice += serviceDetail.totalPrice;
        total += serviceDetail.totalPrice;
      }
      order.services = detailOrderService;
      order.checkin = convertDate(new Date(order.dateOfCheckIn));
      order.checkout = convertDate(new Date(order.dateOfCheckOut));
      const roomType = await roomTypeModel.findById(order.roomTypeID);
      order.roomType = roomType ? roomType.name : `Room isn't available`;
      total += order.price;
    }

    res.render("account/profile", {
      isAuth: req.user,
      user: req.user,
      orders: orders,
      total: total,
      active: { account: true, profile: true },
    });
  },

  getChangePassword: (req, res, next) => {
    res.render("account/change-password", {
      layout: "main_no_head",
    });
  },
  postChangePassword: async (req, res, next) => {
    const user = await customerModel.findOne(req.user);
    if (!user) {
      return res.redirect("/account/sign-in");
    }

    const isValid = bcrypt.compareSync(req.body["old-password"], user.password);
    if (!isValid) {
      return res.render("account/change-password", {
        layout: "main_no_head",
        error: "Current password is not correct",
      });
    }

    if (req.body["new-password"] !== req.body["confirm-password"]) {
      return res.render("account/change-password", {
        layout: "main_no_head",
        error: "Please confirm your new password",
      });
    }

    const hash = bcrypt.hashSync(req.body["new-password"], 10);
    req.user.password = hash;
    await customerModel.findOneAndUpdate(
      { _id: req.user._id },
      { password: hash }
    );
    res.redirect("/");
  },

  logout: (req, res, next) => {
    req.logOut();
    req.session.destroy(function (err) {
      res.redirect("/");
    });
  },

  getForgotPassword: (req, res, next) => {
    res.render("account/forgot-password", {
      layout: "main_no_head",
    });
  },

  postForgotPassword: async (req, res, next) => {
    // res.json({
    //   phone: req.body.phone,
    //   origin: req.body.origin_phone,
    // });

    const user = await customerModel.findOne({ phone: req.body.origin_phone });
    if (!user) {
      return res.render("account/forgot-password", {
        layout: "main_no_head",
        error: "Phone number is not exist",
      });
    } else if (req.body.phone) {
      client.verify
        .services(process.env.SERVICE_ID)
        .verifications.create({
          to: `+${req.body.phone}`,
          channel: "sms",
        })
        .then((data) => {
          res.render("account/verification", {
            layout: "main_no_head",
            message: "Verification is sent!!",
            phone: req.body.phone,
            origin: req.body.origin_phone,
          });
        });
    } else {
      res.render("account/forgot-password", {
        layout: "main_no_head",
        error: "Input your phone number",
      });
    }
  },
  checkVerification: async (req, res, next) => {
    if (req.body.phone && req.body.code.length === 6) {
      client.verify
        .services(process.env.SERVICE_ID)
        .verificationChecks.create({
          to: `+${req.body.phone}`,
          code: req.body.code,
        })
        .then(async (data) => {
          if (data.status === "approved") {
            const user = await customerModel.findOne({
              phone: req.body.origin_phone,
            });
            const hash = bcrypt.hashSync(user.ID, 10);
            user.password = hash;
            await customerModel.findOneAndUpdate(
              { phone: req.body.origin_phone },
              { password: hash }
            );

            res.render("account/sign-in", {
              message: "Your password is reseted!!",
              layout: "main_no_head",
            });
          } else {
            res.render("account/verification", {
              layout: "main_no_head",
              error: "Wrong phone number or code :(",
              phone: req.body.phone,
              origin: req.body.origin_phone,
            });
          }
        });
    } else {
      res.render("account/verification", {
        layout: "main_no_head",
        error: "Wrong phone number or length of code other than 6 digits :(",
        phone: req.body.phone,
        origin: req.body.origin_phone,
      });
    }
  },
};
