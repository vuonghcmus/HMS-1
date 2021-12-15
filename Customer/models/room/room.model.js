<<<<<<< HEAD
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RoomSchema = new Schema(
  {
    roomNumber: { type: Schema.Types.String },
    status: { type: Schema.Types.Boolean },
    retalEndDate: { type: Schema.Types.Date },
    bookedDate: [{ type: Schema.Types.Date }],
  },
  {
    collection: "Room",
  }
);
const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;
=======
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const room = new Schema({
    roomNumber: { type: Schema.Types.String},
    status: { type: Schema.Types.String},
    retalEndDate: { type: Schema.Types.Date},
    bookedDate: [{ type: Schema.Types.Date}]
},{
    collection: 'Room'
})
export default mongoose.model('Room',room)
>>>>>>> 34cde3b822bcc3f7bba37427470edb704634234e
