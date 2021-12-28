const serviceService = require("../services/service/service.service");

class ServiceController {
    //[GET] /
    async show(req, res, next) {
        res.render("home/home");
    }

    //[GET] /search-order
    async getSearch(req, res, next) {
        res.render("home/search-order");
    }

    //[POST] /search-order
    async postSearch(req, res, next) {
        res.render("home/search-order");
    }

    // [GET] /elements
    async elements(req, res, next) {
        res.render("home/elements");
    }

    // [GET] /blog
    async blog(req, res, next) {
        res.render("home/blog");
    }

    // [GET] /contact
    async contact(req, res, next) {
        res.render("home/contact");
    }

    // [GET] /about-us
    async aboutUs(req, res, next) {
        res.render("home/about-us");
    }

}
module.exports = new ServiceController;