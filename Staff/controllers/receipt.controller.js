const RoomOrder = require("../models/order/detailOrderRoom.model");
const Room = require("../models/room/roomType.model");
const ServiceOrder = require("../models/order/detailOrderService.model");
const Service = require("../models/service/service.model");
const Customer = require("../models/account/customer.model");



module.exports = {
    showReceipt: async (req, res) => {
        const roomReceipt =  await RoomOrder.findById(req.params.id);
        const roomType = await Room.findById(roomReceipt.roomTypeID);
        const customerInfo = await Customer.findById(roomReceipt.customerID);      

        const checkIn =  roomReceipt.dateOfCheckIn.toLocaleDateString() + " " + roomReceipt.dateOfCheckIn.toLocaleTimeString();
        const checkOut = roomReceipt.dateOfCheckOut.toLocaleDateString() + " " + roomReceipt.dateOfCheckOut.toLocaleTimeString();

        const room = {id: req.params.id, name: roomReceipt.roomID, type: roomType.name, price: roomType.price, checkin: checkIn, checkout: checkOut, numday: roomReceipt.price/roomType.price, subtotal: roomReceipt.price};
        var service = [];
        var total = roomReceipt.price;



        for(var i = 0; i < roomReceipt.detailOrderService.length; i++){
            const serviceId = roomReceipt.detailOrderService[i];
            const serviceItem = await ServiceOrder.findById(serviceId);
            const serviceInfo = await Service.findById(serviceItem.serviceID);

            service.push({name: serviceInfo.name, price: serviceInfo.price, quantity: serviceItem.number, subtotal: serviceInfo.price* serviceItem.number});
            total += serviceInfo.price* serviceItem.number;
        }

        res.render('receipt/receipt',{
            customerInfo,
            room,
            service,
            total
        })
    },

    payment: async (req, res) => {
        await RoomOrder.findOneAndUpdate(
            {_id: req.params.id},
            {status: "done"}
        )
        res.redirect('/customer?status=using&page=1')
    }
}