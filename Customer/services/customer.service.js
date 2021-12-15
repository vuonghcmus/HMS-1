const customerModel = require("../models/account/customer.model");

const customerService = {
    async getUserByUsername(username){
        return await customerModel.findOne({ username: username }).lean()
    },
    async getUser(username, password) {
        return await customerModel.findOne({ username: username, password: password }).lean()
    },
    async createNewUser(username, password, fullname, phone, ID) {
        return await customerModel.create({username: username, password: password, fullname: fullname, phone: phone, ID: ID, status: true})
    },
}

module.exports = customerService