const orderServiceModel = require("../../models/order/orderService.model");
const detailOrderServiceService = require('./detailOrderService.service')

const OrderServiceService = {

    async findAll() {
        const orders = await orderServiceModel.find({});
        const newOrders = orders.map(order => {
            const newOrder = await this.findById(order._id)
            return newOrder
        })
        return newOrders;
    },
    
    async findById(id) {
        const order = await orderServiceModel.findById(id)
        const details = []
        for(const id in order.detailsOrderService) {
            const detail = await this.findDetailById(id)
            details.push(detail)
            order.detailsOrderService = details
        }
        order.detailsOrderService = details
        return order
    },

    async findByCustomerId(customerId) {
        const orders = await orderServiceModel.find({customerID: customerId});
        const newOrders = orders.map(order => {
            const newOrder = await this.findById(order._id)
            return newOrder
        })
        return newOrders;
    },

    async findByRoomId(roomId) {
        const orders = await orderServiceModel.find({roomID: roomId});
        const newOrders = orders.map(order => {
            const newOrder = await this.findById(order._id)
            return newOrder
        })
        return newOrders;
    },

    async findDetailById(id) {
       const detailOrderService = await detailOrderServiceService.findById(id)
       return detailOrderService
    },
}

module.exports = OrderServiceService