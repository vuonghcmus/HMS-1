const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DetailOrderServiceSchema = new Schema(
  {
    service: { type: Schema.Types.ObjectId },
    number: { type: Schema.Types.Number },
  },
  {
    collection: "DetailOrderService",
  }
);
const DetailOrderService = mongoose.model(
  "DetailOrderService",
  DetailOrderServiceSchema
);
module.exports = DetailOrderService;
