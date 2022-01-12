const Notification = require("../../models/notification/notification.model");

module.exports = {
  getAllCustomer: (req, res) => {},
  notify: (req, res) => {
    // find all notification
    Notification.find({}).then((notifications) => {
      res.status(201).json(notifications);
    });
  },
};
