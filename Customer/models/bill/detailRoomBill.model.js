const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DetailRoomBillSchema = new Schema(
  {
    roomID: { type: Schema.Types.ObjectId },
    dateOfCheckIn: { type: Schema.Types.Date },
    dateOfCheatOut: { type: Schema.Types.Date },
    price: { type: Schema.Types.Number },
  },
  {
    collection: "DetailRoomBill",
  }
);
const DetailRoomBill = mongoose.model("DetailRoomBill", DetailRoomBillSchema);
module.exports = DetailRoomBill;
