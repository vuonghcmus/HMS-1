const RoomType = require("../models/room/roomType.model");
// const Room = require("../models/room/room.model");

module.exports = {
  showListRoomType: async (req, res) => {
    let perPage = 2; // số lượng sản phẩm xuất hiện trên 1 page
    let page = req.query.page || 1; // số page hiện tại
    if (page < 1) {
      page = 1;
    }

    var type = req.query.type
    if(type == ""){
      res.redirect("/room-type?page="+page)
    }
    else{
      if(!type){
        type = ""
      }

      RoomType.find({
        "name": {
          $regex: type,
          $options: 'mi'
        }
      }) // find tất cả các data
        .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
        .limit(perPage)
        .exec((err, roomType) => {
          RoomType.countDocuments({
            "name": {
              $regex: type,
              $options: 'mi'
            }
          }, async (err, count) => {
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
            res.render("room-type/list-room-type", {
              roomType,
              pages,
              isNextPage: page < Math.ceil(count / perPage),
              isPreviousPage: page > 1,
              nextPage: +page + 1,
              previousPage: +page - 1,
              length: roomType.length,
              type,
            });
          });
        });
    }
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
    RoomType.findByIdAndUpdate(
      req.body.id,
      {
        name: req.body.name,
        price: req.body.price,
        area: req.body.area,
        bed: req.body.bed,
        type: req.body.type,
        MaxOfPeople: req.body.maxOfPeople,
        image: req.body.urlImage,
        description: req.body.description,
      },
      (err, roomType) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/room-type?page=1");
        }
      }
    );
  },
  deleteRoomType: async (req, res) => {
    const roomType = await RoomType.findById(req.params.id);
    await RoomType.findByIdAndDelete(req.params.id);
    res.redirect("/room-type?page=1");
  },
  addRoomTypePost: (req, res) => {
    const roomType = new RoomType({
      name: req.body.name,
      price: req.body.price,
      area: req.body.area,
      bed: req.body.bed,
      type: req.body.type,
      MaxOfPeople: req.body.maxOfPeople,
      image: req.body.urlImage,
      description: req.body.description,
      rooms: [],
    });

    roomType.save((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/room-type?page=1");
      }
    });
  },
  deleteRoom: (req, res) => {
    // find room type by id and delete room name in array
    RoomType.findById(req.query.roomTypeId, (err, roomType) => {
      if (err) {
        console.log(err);
      } else {
        const index = roomType.rooms.indexOf(req.query.roomName);
        if (index !== -1) {
          roomType.rooms.splice(index, 1);
        }
        roomType.save((err) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect("/room-type?page=1");
          }
        });
      }
    });
  },
  addRoom: (req, res) => {
    // find room type by id and add room name in array
    RoomType.findById(req.body.roomTypeId, (err, roomType) => {
      if (err) {
        console.log(err);
      } else {
        // check if room name is exist
        if (roomType.rooms.indexOf(req.body.roomName) === -1) {
          roomType.rooms.push(req.body.roomName);
          roomType.save((err) => {
            if (err) {
              console.log(err);
            } else {
              // res.redirect("/room-type?page=1");
              return res.status(201).json(roomType);
            }
          });
        } else {
          // res.redirect("/room-type?page=1");
          return res.status(500).json({
            status: "fail",
            message: "Room name is exist",
          });
        }
      }
    });
  },
  editRoom: (req, res) => {
    // console.log("vuong");
    // console.log(req.body.roomTypeId);
    // console.log(req.body);
    // res.send(req.body);
    // find room type by id and edit room name in array
    RoomType.findById(req.body.roomTypeId, (err, roomType) => {
      if (err) {
        console.log(err);
      } else {
        const index = roomType.rooms.indexOf(req.body.oldRoomName);
        if (index !== -1) {
          // check if new room name is exist
          if (roomType.rooms.indexOf(req.body.newRoomName) === -1) {
            roomType.rooms[index] = req.body.newRoomName;
            roomType.save((err) => {
              if (err) {
                console.log(err);
              } else {
                return res.status(201).json(roomType);
              }
            });
          } else {
            return res.status(500).json({
              status: "fail",
              message: "Room name is exist",
            });
          }
        }
      }
    });
  },
};
