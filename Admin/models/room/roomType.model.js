const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RoomTypeSchema = new Schema(
  {
    name: { type: Schema.Types.String },
    price: { type: Schema.Types.Number },
    area: { type: Schema.Types.Number },
    singleBed: { type: Schema.Types.Number },
    doubleBed: { type: Schema.Types.Number },
    maxOfPeople: { type: Schema.Types.Number },
    description: { type: Schema.Types.String },
    image: { type: Schema.Types.String },
    listRooms: [{ type: Schema.Types.ObjectId }],
  },
  {
    collection: "RoomType",
  }
);
const RoomType = mongoose.model("RoomType", RoomTypeSchema);
module.exports = RoomType;
