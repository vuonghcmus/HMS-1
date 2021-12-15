const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DetailServiceRevenueSchema = new Schema(
  {
    service: { type: Schema.Types.ObjectId },
    revenue: { type: Schema.Types.Number },
  },
  {
    collection: "DetailServiceRevenue",
  }
);
const DetailServiceRevenue = mongoose.model(
  "DetailServiceRevenue",
  DetailServiceRevenueSchema
);
module.exports = DetailServiceRevenue;
