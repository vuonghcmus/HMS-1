const billModel = require("../../models/bill/bill.model");
const detailRoomBillService = require("./detailRoomBill.service")
const detailServiceBillService = require("./detailServiceBill.service")

const BillService = {
    async getBillById(id){
        return await billModel.findById(id).lean()
    },
    async getBillByUserId(customerId){
        return await billModel.find({ customerID }).lean()
    },
    async getDetails(id){
        const currentBill = await billModel.findById(id).lean()
        const roomIds = currentBillId.RoomBill
        const serviceIds = currentBillId.ServiceBill
        let totalPrice = 0

        const rooms = []
        const services = []

        for (roomId of roomIds) {
            const room = await detailRoomBillService.getDetailRoomBillById(roomId)
            rooms.push(room)
        }
        for (serviceId of serviceIds) {
            const service = await detailRoomBillService.getDetailRoomBillById(serviceId)
            services.push(service)
        }

        rooms.reduce(((total, room) => total + room.price), totalPrice)
        services.reduce(((total, service) => total + service.price), totalPrice)
        
        return await {...currentBill, rooms, services, totalPrice}
    },
}

module.exports = BillService