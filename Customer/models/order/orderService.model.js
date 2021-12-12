const mongoose = require('mongoose')
const Schema = mongoose.Schema
const orderService = new Schema({
    customer: { type: Schema.Types.ObjectId},
    orderDate: { type: Schema.Types.Date},
    status: { type: Schema.Types.String},
    detailsOrderService: [{ type: Schema.Types.ObjectId}]
},{
    collection: 'OrderService'
})
export default mongoose.model('Order Service',orderService)