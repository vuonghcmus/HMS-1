const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DetailOrderServiceSchema = new Schema({
    serviceID: { type: Schema.Types.ObjectId },
    number: { type: Schema.Types.Number },
    orderDate: { type: Schema.Types.Date },
    price: { type: Schema.Types.Number },
    userID: { type: Schema.Types.ObjectId },
    status: { type: Schema.Types.String },
}, {
    collection: "DetailOrderService",
});
const DetailOrderService = mongoose.model(
    "DetailOrderService",
    DetailOrderServiceSchema
);
module.exports = DetailOrderService;