class HomeController {
    //[GET] /
    async show(req, res, next) {
        res.render("home/home", {
            active: {home: true}
        });
    }

    //[GET] /search-order
    async getSearch(req, res, next) {
        res.render("home/search-order", {
            active: {search: true}
        });
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
        res.render("home/contact", {
            active: {contact: true}
        });
    }

    // [GET] /about-us
    async aboutUs(req, res, next) {
        res.render("home/about-us");
    }

}
module.exports = new HomeController;