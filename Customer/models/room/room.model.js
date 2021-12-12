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