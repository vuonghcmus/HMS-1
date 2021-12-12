const mongoose = require('mongoose')
const Schema = mongoose.Schema
const revenue = new Schema({
    date: { type: Schema.Types.Date},
    serviceRevenue: [{ type: Schema.Types.ObjectId}],
    roomTypeRevenue: [{ type: Schema.Types.ObjectId}],
    totalRevenue: { type: Schema.Types.Number}
},{
    collection: 'Revenue'
})
export default mongoose.model('Revenue',revenue)