const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DetailServiceBillSchema = new Schema(
  {
    service: { type: Schema.Types.ObjectId },
    orderDate: { type: Schema.Types.Date },
    number: { type: Schema.Types.Number },
    price: { type: Schema.Types.Number },
  },
  {
    collection: "DetailServiceBill",
  }
);
const DetailServiceBill = mongoose.model(
  "DetailServiceBill",
  DetailServiceBillSchema
);
module.exports = DetailServiceBill;
