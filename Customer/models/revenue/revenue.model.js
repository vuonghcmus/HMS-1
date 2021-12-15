const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RevenueSchema = new Schema(
  {
    date: { type: Schema.Types.Date },
    serviceRevenue: [{ type: Schema.Types.ObjectId }],
    roomTypeRevenue: [{ type: Schema.Types.ObjectId }],
    totalRevenue: { type: Schema.Types.Number },
  },
  {
    collection: "Revenue",
  }
);
const Revenue = mongoose.model("Revenue", RevenueSchema);
module.exports = Revenue;
