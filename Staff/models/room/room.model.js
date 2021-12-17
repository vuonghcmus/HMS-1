const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RoomSchema = new Schema(
  {
    roomNumber: { type: Schema.Types.String },
    status: { type: Schema.Types.Boolean },
    rentalEndDate: { type: Schema.Types.String },
    bookedDate: { type: Schema.Types.String },
    type: { type: Schema.Types.String },
  },
  {
    collection: "Room",
  }
);
const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;
