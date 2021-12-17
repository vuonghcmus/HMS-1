const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BillSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId },
    status: { type: Schema.Types.Boolean },
    dateOfCreated: { type: Schema.Types.Date },
    ServiceBill: [{ type: Schema.Types.ObjectId }],
    RoomBill: [{ type: Schema.Types.ObjectId }],
    totalPrice: { type: Schema.Types.Number },
  },
  {
    collection: "Bill",
  }
);
const Bill = mongoose.model("Bill", BillSchema);
module.exports = Bill;
