const mongoose = require('mongoose')
const Schema = mongoose.Schema
const service = new Schema({
    serviceName: { type: Schema.Types.String},
    description: { type: Schema.Types.String},
    price: { type: Schema.Types.Number}
},{
    collection: 'Service'
})
export default mongoose.model('service',service)