const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderRoomSchema = new Schema(
  {
    fullname: { type: Schema.Types.String },
    phone: { type: Schema.Types.String },
    ID: { type: Schema.Types.String },
    detailsOrderRoom: [{ type: Schema.Types.ObjectId }],
  },
  {
    collection: "OrderRoom",
  }
);
const OrderRoom = mongoose.model("OrderRoom", OrderRoomSchema);
module.exports = OrderRoom;
