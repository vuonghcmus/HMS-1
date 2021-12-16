const RoomType = require("../models/room/roomType.model");
const Room = require("../models/room/room.model");

module.exports = {
  showListRoomType: async (req, res) => {
    let perPage = 2; // số lượng sản phẩm xuất hiện trên 1 page
    let page = req.query.page || 1; // số page hiện tại
    if (page < 1) {
      page = 1;
    }

    RoomType.find() // find tất cả các data
      .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)
      .exec((err, roomType) => {
        RoomType.countDocuments(async (err, count) => {
          // đếm để tính có bao nhiêu trang
          if (err) return next(err);
          const listRooms = [];

          for (let i = 0; i < roomType.length; i++) {
            const _room = await Room.find({
              _id: { $in: roomType[i].listRooms },
            });

            listRooms.push(_room);
          }
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
          res.render("room-type/list-room-type", {
            roomType,
            pages,
            isNextPage: page < Math.ceil(count / perPage),
            isPreviousPage: page > 1,
            nextPage: +page + 1,
            previousPage: +page - 1,
            rooms: listRooms,
            length: listRooms.length,
          });
        });
      });
  },
  editRoomTypeGet: (req, res) => {
    RoomType.findById(req.params.id, (err, roomType) => {
      if (err) {
        console.log(err);
      } else {
        res.render("room-type/edit-room-type", {
          roomType,
        });
      }
    });
  },
  editRoomTypePost: async (req, res) => {
    const roomType = await RoomType.findById(req.body.id);
    roomType.name = req.body.name;
    roomType.price = req.body.price;
    roomType.area = req.body.area;
    roomType.singleBed = req.body.singleBed;
    roomType.doubleBed = req.body.doubleBed;
    roomType.maxOfPeople = req.body.maxOfPeople;
    roomType.image = req.body.urlImage;
    roomType.description = req.body.description;
    roomType.save();
    const listRooms = roomType.listRooms;
    for (let i = 0; i < listRooms.length; i++) {
      const room = await Room.findById(listRooms[i]);
      room.type = req.body.name;
      room.save();
    }
    res.redirect("/room-type/list-room-type?page=1");
  },
  deleteRoomType: async (req, res) => {
    const roomType = await RoomType.findById(req.params.id);
    const listRooms = roomType.listRooms;

    for (let i = 0; i < listRooms.length; i++) {
      await Room.findByIdAndDelete(listRooms[i]);
    }

    await RoomType.findByIdAndDelete(req.params.id);
    res.redirect("/room-type/list-room-type?page=1");
  },
  addRoomTypePost: (req, res) => {
    const roomType = new RoomType({
      name: req.body.name,
      price: req.body.price,
      area: req.body.area,
      singleBed: req.body.singleBed,
      doubleBed: req.body.doubleBed,
      maxOfPeople: req.body.maxOfPeople,
      image: req.body.urlImage,
      description: req.body.description,
      listRooms: [],
    });

    roomType.save((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/room-type/list-room-type?page=1");
      }
    });
  },
};
