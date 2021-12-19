const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderRoomSchema = new Schema(
  {
    customerID: {type: Schema.Types.ObjectId},
    detailsOrderRoom: [{ type: Schema.Types.ObjectId }],
    status: {type: Schema.Types.String},
  },
  {
    collection: "OrderRoom",
  }
);
const OrderRoom = mongoose.model("OrderRoom", OrderRoomSchema);
module.exports = OrderRoom;
