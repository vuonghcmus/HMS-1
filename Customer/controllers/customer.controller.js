const customerModel = require("../models/account/customer.model");
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
        });
    },
    login: (req, res, next) => {
        passport.authenticate(
            "local", {
                successRedirect: "/",
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

    profile: (req, res, next) => {
        res.render('account/profile')
    },

    changePassword: (req, res, next) => {
        res.render('account/change-password')
    }

}