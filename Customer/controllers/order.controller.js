const customerModel = require('../models/account/customer.model')
const customerService = require('../services/customer.service')
const detailOrderRoomModel = require('../models/order/detailOrderRoom.model')
const { calculateDay } = require('../utils/')
class ServiceController {
    //[GET] /orders/
    async show(req, res, next) {



        
        if(!req.session.cart || req.session.cart.rooms.length <= 0) {
            return res.redirect('/rooms')
        }
        
        if(req.query.status === 'success') {
            req.session.cart = null
            let message = req.query.user === 'exists' ? 
                    'Please login with your current account password':
                    'Please check in at the hotel to active your account (default password is your ID number)'
            return res.render('orders/success', {
                message: message,
                isAuth: req.user
            })
        }
        let totalAmount = 0
        const roomTypes = req.session.cart.rooms
        for (const roomType of roomTypes) {
            roomType.listRoom.forEach(room => {
                room.amount = calculateDay(room.checkin, room.checkout) * roomType.RoomPrice
                totalAmount += room.amount
            })
        }


        console.log('rooms', roomTypes)

        for (const roomType of roomTypes) {
           console.log(roomType.listRoom)
        }

        req.session.cart.rooms.totalAmount = totalAmount
        req.session.cart.rooms = roomTypes

        res.render("orders/order" , {
            rooms: roomTypes,
            isAuth: req.user,
            user: req.user
        });
    }

    //[POST] /orders/
    async order(req, res, next) {

        const userIsExists = true
        const {phone, identity} = req.body
        let customer = await customerService.findOne({phone: phone, ID: identity})
        console.log(customer)
        // customer not exists
        if(!customer) {
            userIsExists = false
            const fullname = req.body['last-name'] + ' ' + req.body['first-name']
            await customerService.create({
                password: identity,
                fullname,
                phone,
                ID: identity,
            })
            customer = await customerService.findOne({phone, identity})
        }

        const roomTypes = req.session.cart.rooms

        for(const roomType of roomTypes) {
            for(const room of roomType.listRoom) {
                await detailOrderRoomModel.create({
                    roomID: room.roomid,
                    customerID: customer._id,
                    roomTypeID: roomType.roomTypeID,
                    people: room.people,
                    dateOfCheckIn: new Date(room.checkin),
                    dateOfCheckOut: new Date(room.checkout),
                    status: 'pending',
                    detailOrderService: [],
                    price: room.amount
                })
            }
        }

        let url = '/orders?status=success'
        url += userIsExists ? '&&user=exists' : ''

        res.redirect(url)
    }

    
}
module.exports = new ServiceController;