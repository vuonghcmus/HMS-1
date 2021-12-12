const mongoose = require('mongoose')
const Schema = mongoose.Schema
const detailRoomBill = new Schema({
    room: { type: Schema.Types.ObjectId},
    dateOfCheckIn: { type: Schema.Types.Date},
    dateOfCheatOut: { type: Schema.Types.Date},
    price: {type: Schema.Types.Number}
},{
    collection: 'DetailRoomBill'
})
export default mongoose.model('Detail Room Bill',detailRoomBill)