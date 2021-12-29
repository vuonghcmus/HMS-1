const detailServiceBillModel = require("../../models/bill/detailServiceBill.model");

const DetailServiceBillService = {
    async findAll() {
        const result = await detailServiceBillModel.find({});
        return result;
    },
    async findById(id) {
        return await detailServiceBillModel.findById(id).lean();
    },

}

module.exports = DetailServiceBillService