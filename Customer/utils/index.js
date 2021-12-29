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


module.exports = {
    generateBookingTable
}