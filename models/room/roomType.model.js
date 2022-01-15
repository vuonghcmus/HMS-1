const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomTypeSchema = new Schema({
    name: { type: Schema.Types.String},
    price: { type: Schema.Types.Number},
    area: { type: Schema.Types.Number},
    bed: { type: Schema.Types.Number},
    type: { type: Schema.Types.Number},
    maxOfPeople: { type: Schema.Types.Number},
    description: { type: Schema.Types.String},
    rooms: [{type: Schema.Types.String}],
    image: {type: Schema.Types.String},
},{
    collection: 'RoomType'
})
module.exports = mongoose.model('RoomType',RoomTypeSchema)
