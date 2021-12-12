const mongoose = require('mongoose')
const Schema = mongoose.Schema
const customer = new Schema({
    username: { type: Schema.Types.String},
    password: { type: Schema.Types.String},
    fullname: { type: Schema.Types.String},
    phone: { type: Schema.Types.String},
    ID: { type: Schema.Types.String},
    Status: { type: Schema.Types.String}
},{
    collection: 'Customer'
})
export default mongoose.model('customer',customer)