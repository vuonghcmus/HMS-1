const mongoose = require('mongoose')
const Schema = mongoose.Schema
const detailServiceRevenue = new Schema({
    service: { type: Schema.Types.ObjectId},
    revenue: { type: Schema.Types.Number}
},{
    collection: 'DetailServiceRevenue'
})
export default mongoose.model('Detail Service Revenue',detailServiceRevenue)