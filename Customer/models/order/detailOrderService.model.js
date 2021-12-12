const mongoose = require('mongoose')
const Schema = mongoose.Schema
const detailOrderService = new Schema({
    service: { type: Schema.Types.ObjectId},
    number: { type: Schema.Types.Number}
},{
    collection: 'DetailOrderService'
})
export default mongoose.model('Detail Order Service',detailOrderService)