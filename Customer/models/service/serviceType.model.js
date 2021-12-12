const mongoose = require('mongoose')
const Schema = mongoose.Schema
const serviceType = new Schema({
    nameOfServiceType: { type: Schema.Types.String},
    services: [{type: Schema.Types.ObjectId}]
},{
    collection: 'ServiceType'
})
export default mongoose.model('Service Type',serviceType)