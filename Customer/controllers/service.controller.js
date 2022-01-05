const DetailOrderService = require("../services/order/detailOrderService.service");
const DetailOrderRoom = require("../services/order/detailOrderRoom.service");

const serviceService = require("../services/service/service.service");
const serviceTypeService = require("../services/service/serviceType.service");
const { all } = require("../routes/bill.route");


class ServiceController {

    //[GET] /services/
    async show(req, res, next) {
        const allServiceTypes = await serviceTypeService.findAll();
        var allBookedRooms = [];
        if (req.user) {
            if (!req.user.ServiceCart) {
                req.user.ServiceCart = [];
            }
            allBookedRooms = await DetailOrderRoom.findAllCurrentRooms(req.user._id);
            // console.log(req.user.ServiceCart);
        }
        console.log(req.user.ServiceCart);
        // console.log(allBookedRooms);

        res.render("services/services", {
            allServices: allServiceTypes,
            isAuth: req.user,
            cart: req.user ? req.user.ServiceCart : [],
            allBookedRooms: allBookedRooms
        });

    }

    //[GET] /services/:id_service
    async ServiceDetail(req, res, next) {

        const services = await serviceService.findByTypeId(req.params.id_service);
        console.log(services);
        res.render("services/service-details", {
            services: services,
            isAuth: req.user
        });
    }

    //[POST] /services/add-to-cart
    async addServiceToCart(req, res, next) {
        if (req.user) {
            if (!req.user.ServiceCart) {
                req.user.ServiceCart = [];
            }
            var ServiceCart = req.user.ServiceCart;
            var tempCart = [];
            const idservices = req.body.id_service;
            const nameservices = req.body.name_service;
            const priceservices = req.body.price_service;
            const order_amounts = req.body.order_amount;

            if (Array.isArray(idservices)) {
                for (let i = 0; i < idservices.length; i++) {
                    tempCart.push({
                        idService: idservices[i],
                        nameService: nameservices[i],
                        priceService: priceservices[i],
                        orderAmount: order_amounts[i],
                        orderDate: new Date(),
                    })
                }
            } else {
                tempCart.push({
                    idService: idservices,
                    nameService: nameservices,
                    priceService: priceservices,
                    orderAmount: order_amounts,
                    orderDate: new Date(),
                })
            }
            //find existed services
            for (let i = 0; i < tempCart.length; i++) {
                const index = ServiceCart.findIndex((o) => o.idService == tempCart[i].idService);

                if (index >= 0) {
                    //update quantity
                    if (parseInt(tempCart[i].orderAmount) > 0) {
                        ServiceCart[index].orderAmount = tempCart[i].orderAmount;
                    }

                } else {
                    if (parseInt(tempCart[i].orderAmount) > 0) {
                        ServiceCart.push(tempCart[i]);
                    }
                }

                console.log(req.user.cart);
                //return to services
                res.redirect("/services");
            }
        }
    }
    async confirmCart(req, res, next) {
        if (req.user) {
            const orderAmounts = req.body.orderAmount;
            var ServiceCart = req.user.ServiceCart;
            const roomID = req.body.roomID;
            console.log(roomID);
            // console.log(req.body);
            console.log(ServiceCart);

            if (ServiceCart.length > 0) {
                if (Array.isArray(orderAmounts)) {
                    for (let i = 0; i < orderAmounts.length; i++) {
                        ServiceCart[i].orderAmount = orderAmounts[i];
                    }
                } else {
                    ServiceCart[0].orderAmount = orderAmounts;
                }
                //update in database

                ServiceCart.forEach(async(sc) => {
                    const addBookedService = await DetailOrderService.addDetailOrderRoom(sc.idService, sc.priceService, sc.orderAmount, sc.orderDate, req.user._id);
                    console.log("Add:");
                    console.log(addBookedService);
                    await DetailOrderRoom.updateServiceByRoomId(roomID, addBookedService._id);
                });
                //clear cart and redirect to page
                req.user.ServiceCart = null;
                res.redirect("/account/profile");
            } else {
                console.log("Cart is empty");
                res.redirect('/services');
            }



        } else {
            res.redirect('404');
        }

    }

    //[GET] /services/clear-cart
    async clearCart(req, res, next) {
        if (req.user) {
            if (req.user.ServiceCart) {
                console.log(req.user.ServiceCart);
                req.user.ServiceCart = null;

                console.log("Deleted received!");
                console.log(req.user.ServiceCart);
                console.log(req.user);
                res.redirect('/services');

            }
        }
    }

    //[POST] /services/update-cart/:serviceID/:qty
    async updateIncart(req, res, next) {
        if (req.user) {
            const serviceID = req.params.serviceID;
            const qty = req.params.qty;
            if (req.user.ServiceCart) {
                const index = req.user.ServiceCart.findIndex((o) => o.idService == serviceID);
                if (index >= 0) {
                    req.user.ServiceCart[index].orderAmount = qty;
                    res.send("Success update " + String(serviceID) + "-" + String(qty));

                    return;
                }
            }

        }
    }


}
module.exports = new ServiceController;