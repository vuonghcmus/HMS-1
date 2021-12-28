const customerRouter = require('./customer.route')
const serviceRouter = require('./service.route')
const roomRouter = require('./room.route')
const billRouter = require('./bill.route')
const orderRouter = require('./order.route')
const homeRouter = require('./home.route')

const routes = app => {
    app.use('/account', customerRouter)
    app.use('/services', serviceRouter)
    app.use('/rooms', roomRouter)
    app.use('/bills', billRouter)
    app.use('/orders', orderRouter)
    app.use('/', homeRouter)
}

module.exports = routes