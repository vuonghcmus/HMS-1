const customerModel = require("../models/account/customer.model");
const bcrypt = require('bcrypt')
const CustomerService = {
    async findById(id) {
        return await customerModel.findById(id).lean()
    },
    async getUser(username, password) {
        const queryObject = { username }
        if (password) queryObject.password = password

        return await customerModel.findOne(queryObject).lean()
    },
    async findOne(user = {}) {
        return await customerModel.findOne(user).lean()
    },
    async create(user) {
        const { password, fullname, phone, ID } = user
        const hash = bcrypt.hashSync(password.toString(), 10)
        return await customerModel.create({
            username: phone,
            password: hash,
            fullname: fullname,
            phone: phone,
            ID: ID,
            status: false
        })
    },
}

module.exports = CustomerService