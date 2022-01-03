const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const generateBookingTable = (rooms, rowLength = 4) => {

    const newRooms = rooms.slice()
    const table = []
    while(newRooms.length !== 0) {
        const length = newRooms.length < rowLength ? newRooms.length : rowLength
        const row = newRooms.splice(0, length)
        table.push(row)
    }
    return table
}

const findBusyRoom = async (checkin, checkout) => {
    const response = await fetch(`http:127.0.0.1:3000/api/dtor/${checkin}/${checkout}`)
    const data = await response.json()
    return data
}

const findEmptyRoom = (rooms, busyRooms) => {
    
    const data = rooms.map(room => {
        room.available = !busyRooms.includes(room.roomNumber)
        return room
    })
    return data   
}

const calculateDay = (checkin, checkout) => {

    const checkinDate = new Date(checkin)
    const checkoutDate = new Date(checkout)

    return (checkoutDate.getTime() - checkinDate.getTime())/(1000*60*60*24)
}


module.exports = {
    generateBookingTable,
    findBusyRoom,
    findEmptyRoom,
    calculateDay
}