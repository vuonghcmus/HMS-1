const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DetailOrderRoomSchema = new Schema(
  {
    roomID: { type: Schema.Types.String },
    customerID: { type: Schema.Types.ObjectId },
    roomTypeID: { type: Schema.Types.ObjectId },
    people: { type: Schema.Types.Number },
    dateOfCheckIn: { type: Schema.Types.Date, format: "DD/MM/YYYY hh:mm:ss" },
    dateOfCheckOut: { type: Schema.Types.Date, format: "DD/MM/YYYY hh:mm:ss" },
    status: { type: Schema.Types.String },
    detailOrderService: [{ type: Schema.Types.ObjectId }],
    price: { type: Schema.Types.Number },
  },
  {
    collection: "DetailOrderRoom",
  }
);
const DetailOrderRoom = mongoose.model(
  "DetailOrderRoom",
  DetailOrderRoomSchema
);
module.exports = DetailOrderRoom;
