const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ServiceTypeSchema = new Schema(
  {
    name: { type: Schema.Types.String },
    listServices: [{ type: Schema.Types.ObjectId }],
  },
  {
    collection: "ServiceType",
  }
);
const ServiceType = mongoose.model("ServiceType", ServiceTypeSchema);
module.exports = ServiceType;
