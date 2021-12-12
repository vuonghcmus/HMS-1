const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bill = new Schema({
    customer: { type: Schema.Types.ObjectId},
    status: { type: Schema.Types.String},
    dateOfCreated: { type: Schema.Types.Date},
    ServiceBill: [{ type: Schema.Types.ObjectId}],
    RoomBill: [{ type: Schema.Types.ObjectId}],
    totalPrice: {type: Schema.Types.Number}
},{
    collection: 'Bill'
})
export default mongoose.model('Bill',bill)