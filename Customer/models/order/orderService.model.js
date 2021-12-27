const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderServiceSchema = new Schema(
  {
    customerID: { type: Schema.Types.ObjectId },
    roomID: {type: Schema.Types.ObjectId},
    detailsOrderService: [{ type: Schema.Types.ObjectId }],
    status: { type: Schema.Types.String },
    orderDate: { type: Schema.Types.Date },
  },
  {
    collection: "OrderService",
  }
);
const OrderService = mongoose.model("OrderService", OrderServiceSchema);
module.exports = OrderService;
