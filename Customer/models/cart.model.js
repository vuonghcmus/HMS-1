module.exports = function Cart(oldCart) {
    this.rooms = oldCart.rooms || []
    this.services = oldCart.services || []
    this.totalRoomPrice = oldCart.totalRoomPrice || 0
    this.totalServicePrice = oldCart.totalServicePrice || 0
}


