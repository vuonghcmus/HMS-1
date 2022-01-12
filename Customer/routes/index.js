const customerRouter = require('./customer.route')
const serviceRouter = require('./service.route')
const roomRouter = require('./room.route')
const billRouter = require('./bill.route')
const orderRouter = require('./order.route')
const homeRouter = require('./home.route')
const apiRouter = require("./api.route");
const routes = app => {
    app.use('/account', customerRouter)
    app.use('/services', serviceRouter)
    app.use('/rooms', roomRouter)
    app.use('/my-bill', billRouter)
    app.use('/orders', orderRouter)
    app.use("/api", apiRouter);
    app.use('/', homeRouter)
    app.use((req, res, next) => {
        res.render('error/404', {
            layout: 'main_no_head'
        })
    })
}

module.exports = routes