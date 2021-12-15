const mongoose = require('mongoose');

const databaseService = {
    async connect() {
        mongoose.connect(`mongodb+srv://truong2001:truong2001@qlks.nire8.mongodb.net/QuanLyKhachSan?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.connection.on('error', (e) => { throw e });
    }
}
export default databaseService