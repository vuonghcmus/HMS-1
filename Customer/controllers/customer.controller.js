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
            retUrl: req.query.retUrl || '/'
        });
    },
    login: (req, res, next) => {
        console.log(req.query)
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
        res.render('account/profile', {
            isAuth: req.user,
            user: req.user,
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