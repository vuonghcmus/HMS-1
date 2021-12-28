const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ServiceSchema = new Schema({
    name: { type: Schema.Types.String },
    description: { type: Schema.Types.String },
    price: { type: Schema.Types.Number },
    image: { type: Schema.Types.String },
    type: { type: Schema.Types.String },
}, {
    collection: "Service",
});
const Service = mongoose.model("Service", ServiceSchema);
module.exports = Service;