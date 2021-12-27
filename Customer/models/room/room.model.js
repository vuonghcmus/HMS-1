
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomSchema = new Schema({
    roomNumber: { type: Schema.Types.String},
    status: { type: Schema.Types.String},
},{
    collection: 'Room'
})
export default mongoose.model('Room',RoomSchema)
