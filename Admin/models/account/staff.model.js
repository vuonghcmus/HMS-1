const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StaffSchema = new Schema(
  {
    username: { type: Schema.Types.String },
    password: { type: Schema.Types.String },
    fullname: { type: Schema.Types.String },
    birthday: { type: Schema.Types.String },
    phone: { type: Schema.Types.String },
    email: { type: Schema.Types.String },
    bankAccountNumber: { type: Schema.Types.String },
    ID: { type: Schema.Types.String },
    status: { type: Schema.Types.Boolean },
  },
  {
    collection: "Staff",
  }
);
const Staff = mongoose.model("Staff", StaffSchema);
module.exports = Staff;
