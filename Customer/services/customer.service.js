const customerModel = require("../models/account/customer.model");

const CustomerService = {
    async findById(id){
        return await customerModel.findById(id).lean()
    },
    async getUser(username, password) {
        const queryObject = { username }
        if(password) queryObject.password = password

        return await customerModel.findOne(queryObject).lean()
    },
    async find(user = {}) {
        return await customerModel.findOne(user).lean()
    },
    async create(username, password, fullname, phone, ID) {
        return await customerModel.create({username: username, password: password, fullname: fullname, phone: phone, ID: ID, status: "pending"})
    },
}

module.exports = CustomerService