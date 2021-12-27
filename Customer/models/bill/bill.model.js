const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BillSchema = new Schema(
  {
    customerID: { type: Schema.Types.ObjectId },
    status: { type: Schema.Types.String },
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
