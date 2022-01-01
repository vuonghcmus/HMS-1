const CustomerModel = require("../../models/account/customer.model");
const DetailOrderRoomModel = require("../../models/order/detailOrderRoom.model");
const HomeService = {
    async getBookedRoom(phone, identity) {
        //find customer
        const customer = await CustomerModel.findOne({
            ID: identity,
            phone: phone
        }).lean();
        var returnList = [];

        if (customer) { //find room booked by customer
            const orderRoom = await DetailOrderRoomModel.find({
                customerID: customer._id
            }).lean();

            const listRoom = orderRoom.detailOrderRoom;

            for (let i = 0; i < listRoom.length; i++) {
                const detail = await DetailOrderRoomModel.find({
                    _id: listRoom[i],
                }).lean();
                returnList.push(detail);
            }
        }
        console.log(returnList);
        return returnList;

    }
}

module.exports = HomeService