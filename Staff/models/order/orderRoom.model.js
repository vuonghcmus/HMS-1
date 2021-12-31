const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderRoomSchema = new Schema(
  {
    customerID: { type: Schema.Types.ObjectId },
    detailOrderRoom: [{ type: Schema.Types.ObjectId }],
  },
  {
    collection: "OrderRoom",
  }
);
const OrderRoom = mongoose.model("OrderRoom", OrderRoomSchema);
module.exports = OrderRoom;
