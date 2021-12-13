const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DetailRoomTypeRevenueSchema = new Schema(
  {
    roomType: { type: Schema.Types.ObjectId },
    revenue: { type: Schema.Types.Number },
  },
  {
    collection: "DetailRoomTypeRevenue",
  }
);
const DetailRoomTypeRevenue = mongoose.model(
  "DetailRoomTypeRevenue",
  DetailRoomTypeRevenueSchema
);
module.exports = DetailRoomTypeRevenue;
