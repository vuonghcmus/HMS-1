const mongoose = require('mongoose')
const Schema = mongoose.Schema
const roomType = new Schema({
    nameOfRoomType: { type: Schema.Types.String},
    price: { type: Schema.Types.Number},
    area: { type: Schema.Types.Number},
    singleBed: { type: Schema.Types.Number},
    doubleBed: { type: Schema.Types.Number},
    maxOfPeople: { type: Schema.Types.Number},
    description: { type: Schema.Types.String},
    rooms: [{type: Schema.Types.ObjectId}]
},{
    collection: 'RoomType'
})
export default mongoose.model('Room Type',roomType)