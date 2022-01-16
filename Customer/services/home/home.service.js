const CustomerModel = require("../../models/account/customer.model");
const DetailOrderRoomModel = require("../../models/order/detailOrderRoom.model");
const HomeService = {
    async getBookedRoom(phone, identity) {
        //find customer
        const customer = await CustomerModel.findOne({
            ID: identity,
            phone: phone
        }).lean();

        let listRoom = []

        if (customer) { //find room booked by customer
            listRoom = await DetailOrderRoomModel.find({
                customerID: customer._id
            }).lean();

            console.log(listRoom);
            
        }
        return listRoom;
    }
}

module.exports = HomeService