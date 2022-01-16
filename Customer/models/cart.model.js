//static cart
var cart = { rooms: [], services: [] };

module.exports = class Cart {
    static getCart() {
        return cart;
    }

    static emptyRooms() {
        cart.rooms = [];
    }

    static emptyServices() {
        cart.services = [];
    }
}