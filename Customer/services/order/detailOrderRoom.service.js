const detailOrderRoomModel = require("../../models/order/detailOrderRoom.model");
const detailOrderServiceService = require('./detailOrderService.service')

const DetailOrderRoomService = {
    async findAll() {
        const detailOrders = await detailOrderRoomModel.find({});


        const newDetailOrders = detailOrders.map(detail => {
            const newDetailOrder = this.findById(detail._id)
            return newDetailOrder
        })
        return newDetailOrders;
    },

    async findById(id) {

        const detailOrder = await detailOrderRoomModel.findById(id).lean();
        detailOrderServices = []
        for (const id of detailOrder.detailOrderService) {
            const service = await detailOrderServiceService.findById(id)
            detailOrderServices.push(service)
        }
        detailOrder.detailOrderService = detailOrderServices
        return detailOrder
    },

    async findByRoomId(roomId) {
        return await detailOrderRoomModel.find({ roomID: roomId }).lean();
    },

    async findAllCurrentRooms(userID) {
        return await detailOrderRoomModel.find({
            customerID: userID,
            status: "using",
        });
    },

    async findCurrentByRoomIDAndUser(userID, roomID) {
        return await detailOrderRoomModel.findOne({
            customerID: userID,
            roomID: roomID,
        });
    },
    async updateServiceByRoomId(dtorID, orderServiceID) {
        console.log("FInd object")
            // console.log(await detailOrderRoomModel.findOne({ _id: dtorID }));
        return await detailOrderRoomModel.findOneAndUpdate({ _id: dtorID }, {
            $push: {
                detailOrderService: orderServiceID
            }
        })

    },

    async findByDateInOut(datein, dateout) {
        console.log(dateout);
        console.log(dateout <= new Date("2022-01-15"));
        return await detailOrderRoomModel.find({
            dateOfCheckIn: { $lte: dateout },
            dateOfCheckOut: { $gte: datein },
        });
    },
    // async findBusyByDateInOut(datein, dateout) {
    //     return await detailOrderRoomModel.find({
    //         $or: [{
    //                 dateOfCheckIn: { $lte: datein },
    //                 dateOfCheckOut: { $gte: datein },
    //             },
    //             {
    //                 dateOfCheckIn: { $lte: dateout },
    //                 dateOfCheckOut: { $gte: dateout },
    //             },
    //         ]
    //     });
    // }


}

module.exports = DetailOrderRoomService