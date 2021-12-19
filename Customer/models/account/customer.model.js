const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CustomerSchema = new Schema(
  {
    username: { type: Schema.Types.String },
    password: { type: Schema.Types.String },
    fullname: { type: Schema.Types.String },
    phone: { type: Schema.Types.String },
    ID: { type: Schema.Types.String },
    status: { type: Schema.Types.String },
  },
  {
    collection: "Customer",
  }
);
const Customer = mongoose.model("Customer", CustomerSchema);
module.exports = Customer;