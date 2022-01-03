const customerModel = require("../models/account/customer.model");
const serviceModel = require('../models/service/service.model')
const roomTypeModel = require('../models/room/roomType.model')
const detailOrderRoomModel = require('../models/order/detailOrderRoom.model')
const detailOrderServiceModel = require('../models/order/detailOrderService.model')
const { convertDate } = require('../utils/')
const bcrypt = require("bcrypt");
const passport = require("passport");

module.exports = {
    show: (req, res, next) => {
        if (req.user) {
            console.log(req.user)
            return res.redirect("/");
        }

        res.render("account/sign-in", {
            layout: "main_no_head",
            retUrl: req.query.retUrl || '/'
        });
    },
    login: (req, res, next) => {
        passport.authenticate(
            "local", {
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

                if(!customer.status) {
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

        const orders = await detailOrderRoomModel.find({customerID: req.user._id})

        for(let order of orders) {
            const detailOrderService = []
            for(let detailServiceID of order.detailOrderService) {
                const serviceDetail = await detailOrderServiceModel.findById(detailServiceID).lean()
                const service = await serviceModel.findById(serviceDetail.serviceID).lean()
                serviceDetail.service = service
                detailOrderService.push(serviceDetail)
            }
            order.detailOrderService = detailOrderService
            order.checkin = convertDate(new Date(order.dateOfCheckIn))
            order.checkout = convertDate(new Date(order.dateOfCheckOut))
            const roomType = await roomTypeModel.findById(order.roomTypeID)
            order.roomType = roomType ? roomType.name : `Room isn't available`
        }

       


        res.render('account/profile', {
            isAuth: req.user,
            user: req.user,
            orders: orders, 
            active: {account: true, profile: true}
        })
    },

    getChangePassword: (req, res, next) => {
        res.render('account/change-password', {
            layout: 'main_no_head'
        })
    },
    postChangePassword: async (req, res, next) => {
        
        const user = await customerModel.findOne(req.user)
        if(!user) {
            return res.redirect('/account/sign-in')
        }

        const isValid = bcrypt.compareSync(req.body['old-password'], user.password)
        if(!isValid) {
            return res.render('account/change-password', {
                layout: 'main_no_head',
                error: "Current password is not correct",
            })
        }

        if(req.body['new-password'] !== req.body['confirm-password']) {
            return res.render('account/change-password', {
                layout: 'main_no_head',
                error: "Please confirm your new password",
            })
        }

        const hash = bcrypt.hashSync(req.body['new-password'], 10)
        req.user.password = hash
        await customerModel.findOneAndUpdate({_id: req.user._id}, {password: hash})
        res.redirect('/')
    },

    logout: (req, res, next) => {
        req.logOut();
        req.session.destroy(function (err) {
        res.redirect("/");
        });
    }
}