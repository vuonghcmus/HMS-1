const mongoose = require('mongoose')
const Schema = mongoose.Schema
const staff = new Schema({
    username: { type: Schema.Types.String},
    password: { type: Schema.Types.String},
    fullname: { type: Schema.Types.String},
    birthday: { type: Schema.Types.Date},
    phone: { type: Schema.Types.String},
    email: { type: Schema.Types.String},
    bankAccountNumber: { type: Schema.Types.String},
    ID: { type: Schema.Types.String},
    Status: { type: Schema.Types.String}
},{
    collection: 'Staff'
})
export default mongoose.model('staff',staff)