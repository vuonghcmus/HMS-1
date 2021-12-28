const billModel = require("../../models/bill/bill.model");
const detailRoomBillService = require("./detailRoomBill.service")
const detailServiceBillService = require("./detailServiceBill.service")

const BillService = {

    async findAll() {
        const bills = await billModel.find({})
        const newBills = bills.map(bill => {
            const newBill = await this.findById(bill._id)
            return newBill
        })

        return newBills
    },

    async findById(id){
        const bill = await billModel.findById(id).lean()
        const serviceBills = []
        const roomBills = []
        for(const id of bill.ServiceBill) {
            const service = await detailServiceBillService.findById(id)
            serviceBills.push(service)
        }

        for(const id of bill.RoomBill) {
            const room = await detailRoomBillService.findById(id)
            roomBills.push(room)
        }

        bill.ServiceBill = serviceBills
        bill.RoomBill = roomBills
        return bill
    },

    async FindByCustomerId(customerId){
        const bills = await billModel.find({customerID: customerId})
        const newBills = bills.map(bill => {
            const newBill = await this.findById(bill._id)
            return newBill
        })

        return newBills
    },

    async FindByStatus(status){
        const bills = await billModel.find({status: status})
        const newBills = bills.map(bill => {
            const newBill = await this.findById(bill._id)
            return newBill
        })

        return newBills
    },
}

module.exports = BillService