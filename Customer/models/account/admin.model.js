const mongoose = require('mongoose')
const Schema = mongoose.Schema
const admin = new Schema({
    username: { type: Schema.Types.String},
    password: { type: Schema.Types.String},
    fullname: { type: Schema.Types.String},
    phone: { type: Schema.Types.String},
    email: { type: Schema.Types.String}
},{
    collection: 'Admin'
})
export default mongoose.model('admin',admin)