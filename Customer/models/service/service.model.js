const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ServiceSchema = new Schema(
  {
    serviceName: { type: Schema.Types.String },
    description: { type: Schema.Types.String },
    price: { type: Schema.Types.Number },
  },
  {
    collection: "Service",
  }
);
const Service = mongoose.model("Service", ServiceSchema);
module.exports = Service;
