const mongoose = require('mongoose')
const Schema = mongoose.Schema
const detailRoomTypeRevenue = new Schema({
    roomType: { type: Schema.Types.ObjectId},
    revenue: { type: Schema.Types.Number}
},{
    collection: 'DetailRoomTypeRevenue'
})
export default mongoose.model('Detail Room Type Revenue',detailRoomTypeRevenue)