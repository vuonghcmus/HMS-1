const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderServiceSchema = new Schema(
  {
    customerID: { type: Schema.Types.ObjectId },
    orderDate: { type: Schema.Types.Date },
    roomID: {type: Schema.Types.ObjectId},
    status: { type: Schema.Types.String },
    detailsOrderService: [{ type: Schema.Types.ObjectId }],
  },
  {
    collection: "OrderService",
  }
);
const OrderService = mongoose.model("OrderService", OrderServiceSchema);
module.exports = OrderService;
