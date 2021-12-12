const mongoose = require('mongoose')
const Schema = mongoose.Schema
const orderRoom = new Schema({
    fullname: { type: Schema.Types.String},
    phone: { type: Schema.Types.String},
    ID: { type: Schema.Types.String},
    detailsOrderRoom: [{ type: Schema.Types.ObjectId}]
},{
    collection: 'OrderRoom'
})
export default mongoose.model('Order Room',orderRoom)