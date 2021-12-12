const mongoose = require('mongoose')
const Schema = mongoose.Schema
const detailOrderRoom = new Schema({
    room: { type: Schema.Types.ObjectId},
    dateOfCheckIn: { type: Schema.Types.Date},
    dateOfCheckOut: { type: Schema.Types.Date}
},{
    collection: 'DetailOrderRoom'
})
export default mongoose.model('Detail Order Room',detailOrderRoom)