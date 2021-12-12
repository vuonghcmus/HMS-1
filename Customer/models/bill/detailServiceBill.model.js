const mongoose = require('mongoose')
const Schema = mongoose.Schema
const detailServiceBill = new Schema({
    service: { type: Schema.Types.ObjectId},
    orderDate: { type: Schema.Types.Date},
    number: {type: Schema.Types.Number},
    price:  {type: Schema.Types.Number}
},{
    collection: 'DetailServiceBill'
})
export default mongoose.model('Detail Service Bill',detailServiceBill)