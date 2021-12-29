const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DetailOrderRoomSchema = new Schema({
    roomID: { type: Schema.Types.ObjectId },
    dateOfCheckIn: { type: Schema.Types.Date },
    dateOfCheckOut: { type: Schema.Types.Date },
<<<<<<< HEAD
    _id: { type: Schema.Types.ObjectId }
}, {
=======
    detailOrderService: [{ type: Schema.Types.ObjectId }],
    price: {type: Schema.Types.Number},
  },
  {
>>>>>>> 9132fac22c92e6a9aa6633f9e78d957e9ecc10e6
    collection: "DetailOrderRoom",
});
const DetailOrderRoom = mongoose.model(
    "DetailOrderRoom",
    DetailOrderRoomSchema
);
module.exports = DetailOrderRoom;