const customerModel = require("../models/account/customer.model");

const CustomerService = {
    async getUserById(id){
        return await customerModel.findById(id)
    },
    async getUser(username, password) {
        const queryObject = { username }
        if(password) queryObject.password = password

        return await customerModel.findOne(queryObject).lean()
    },
    async createNewUser(username, password, fullname, phone, ID) {
        return await customerModel.create({username: username, password: password, fullname: fullname, phone: phone, ID: ID, status: "pending"})
    },
}

module.exports = CustomerService