const orderRoomModel = require("../../models/order/orderRoom.model");
const detailOrderRoomService = require('./detailOrderRoom.service')
const OrderRoomService = {

    async findAll() {
        const orders = await orderRoomModel.find({});
        const newOrders = orders.map(order => {
            const newOrder = await this.findById(order._id)
            return newOrder
        })
        return newOrders;
    },
    
    async findById(id) {
        const order = await orderRoomModel.findById(id)
        const details = []
        for(const id in order.detailsOrderRoom) {
            const detail = await this.findDetailById(id)
            details.push(detail)
            order.detailsOrderRoom = details
        }
        order.detailsOrderRoom = details
        return order
    },

    async findByCustomerId(customerId) {
        const orders = await orderRoomModel.find({customerID: customerId});
        const newOrders = orders.map(order => {
            const newOrder = await this.findById(order._id)
            return newOrder
        })
        return newOrders;
    },

    async findDetailById(id) {
       const detailOrderRoom = await detailOrderRoomService.findById(id)
       return detailOrderRoom
    },
}

module.exports = OrderRoomService