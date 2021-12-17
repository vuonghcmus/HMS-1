const Room = require("../models/room/room.model");
const RoomType = require("../models/room/roomType.model");

module.exports = {
  showListRoom: (req, res) => {
    let perPage = 3; // số lượng sản phẩm xuất hiện trên 1 page
    let page = req.query.page || 1; // số page hiện tại
    if (page < 1) {
      page = 1;
    }

    Room.find() // find tất cả các data
      .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)
      .exec((err, room) => {
        Room.countDocuments((err, count) => {
          // đếm để tính có bao nhiêu trang
          if (err) return next(err);
          let isCurrentPage;
          const pages = [];
          for (let i = 1; i <= Math.ceil(count / perPage); i++) {
            if (i === +page) {
              isCurrentPage = true;
            } else {
              isCurrentPage = false;
            }
            pages.push({
              page: i,
              isCurrentPage: isCurrentPage,
            });
          }
          res.render("room/list-room", {
            room,
            pages,
            isNextPage: page < Math.ceil(count / perPage),
            isPreviousPage: page > 1,
            nextPage: +page + 1,
            previousPage: +page - 1,
          });
        });
      });
  },
  addRoomGet: async (req, res) => {
    const roomType = await RoomType.find({});
    res.render("room/add-room", {
      roomType,
    });
  },
  addRoomPost: async (req, res) => {
    const room = new Room({
      roomNumber: req.body.roomNumber,
      bookedDate: "",
      rentalEndDate: "",
      status: false,
      type: req.body.selectedRoomType,
    });

    room.save((err) => {
      if (err) {
        console.log(err);
        res.render("room/add-room", {
          msg: err,
        });
      } else {
        RoomType.findByIdAndUpdate(
          req.body.roomType,
          {
            $push: {
              listRooms: room._id,
            },
          },
          (err, cha) => {
            if (err) {
              console.log(err);
            } else {
              res.redirect("/room/list-room?page=1");
            }
          }
        );
      }
    });
  },
  editRoomGet: async (req, res) => {
    const room = await Room.findById(req.params.id);
    const roomType = await RoomType.find({});
    res.render("room/edit-room", {
      room,
      roomType,
    });
  },
  editRoomPost: async (req, res) => {
    const currentRoomType = await RoomType.find({
      listRooms: req.body.id,
    }).clone();

    const room = await Room.findById(req.body.id);

    const bookedDate = req.body.bookedDate || room.bookedDate;
    const rentalEndDate = req.body.rentalEndDate || room.rentalEndDate;

    const _room = await Room.findByIdAndUpdate(
      req.body.id,
      {
        $set: {
          roomNumber: req.body.roomNumber,
          bookedDate: bookedDate,
          rentalEndDate: rentalEndDate,
          type: req.body.selectedRoomType,
        },
      },
      async (err, room) => {
        if (err) return next(err);

        await RoomType.findByIdAndUpdate(
          currentRoomType[0]._id,
          {
            $pull: {
              listRooms: room._id,
            },
          },
          async (err, cha) => {
            if (err) {
              console.log(err);
            } else {
              await RoomType.findByIdAndUpdate(
                req.body.roomType,
                {
                  $addToSet: {
                    listRooms: room._id,
                  },
                },
                (err) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.redirect("/room/list-room?page=1");
                  }
                }
              ).clone();
            }
          }
        ).clone();
      }
    ).clone();
  },
  deleteRoom: async (req, res) => {
    Room.findByIdAndDelete(req.params.id, async (err, room) => {
      if (err) return next(err);

      const currentRoomType = await RoomType.find({
        listRooms: req.params.id,
      }).clone();

      await RoomType.findByIdAndUpdate(
        currentRoomType[0]._id,
        {
          $pull: {
            listRooms: req.params.id,
          },
        },
        (err, cha) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect("/room/list-room?page=1");
          }
        }
      ).clone();
    }).clone();
  },
};
