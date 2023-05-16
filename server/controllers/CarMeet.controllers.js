const Account = require("../models/Account.models");
const CarMeet = require("../models/CarMeet.models");
const CarClub = require("../models/CarClub.models");

const jwt = require("jsonwebtoken");

module.exports = {
  new_meet: async (req, res) => {
    let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);
    Account.findById(decoded.id)
      .then((user) => {
        CarClub.findById(req.body.host)
          .then((club) => {
            CarMeet.create({
              host: club._id,
              about: req.body.about,
              title: req.body.title,
              date: req.body.date,
              time: req.body.time,
              location: req.body.location,
              locationLink: req.body.locationLink,
              image: req.body.image,
              attendance: {
                users: user._id,
              },
            });
          })
          .then((meet) => res.status(200).json(meet))
          .catch((error) => res.status(400).json(error));
      })
      .catch((error) => res.status(400).json({ errors: "please log in" }));
  },
  get_meet: async (req, res) => {
    (await CarMeet.findById(req.params.meet_id))
      .populate([
        { path: "host", select: ["name", "_id", "president"] },
        { path: "attendance.users", select: ["username", "image"] },
      ])
      .then((meet) => res.status(200).json(meet))
      .catch((err) => console.log(err));
  },
  get_recent: async (req, res) => {
    CarMeet.find()
      .populate([
        { path: "host", select: ["name", "_id", "president"] },
        { path: "attendance.users", select: ["username", "image"] },
      ])
      .sort({ createdAt: -1 })
      .limit(10)
      .then((meets) => res.status(200).json(meets))
      .catch((err) => res.status(400).json(err));
  },
  update_meet: async (req, res) => {
    let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);
    let user = await Account.findById(decoded.id);
    let meet = await CarMeet.findById(req.params.meet_id);

    if (String(user._id) === String(meet.host._id)) {
      CarMeet.findByIdAndUpdate(
        meet._id,
        {
          host: user._id,
          about: req.body.about,
          title: req.body.title,
          date: req.body.date,
          time: req.body.time,
          location: req.body.location,
          locationLink: req.body.locationLink,
          image: req.body.image,
        },
        {
          new: true,
          runValidators: true,
        }
      )
        .then((updatedMeet) => res.status(200).json(updatedMeet))
        .catch((err) => console.log(err));
    } else {
      res.status(400).json("you are not the host");
    }
  },
  attend_meet: async (req, res) => {
    let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);
    let user = await Account.findById(decoded.id).select(["username", "image"]);
    if (user) {
      await CarMeet.findById(req.params.meet_id)
        .then((meet) => {
          if (!meet.attendance.users.includes(user._id)) {
            CarMeet.updateOne(
              { _id: meet._id },
              {
                attendance: {
                  users: [...meet.attendance.users, user._id],
                },
              },
              {
                new: true,
                runValidators: true,
              }
            )
              .then((updatedMeet) => res.status(200).json(user))
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log("meet does not exist"));
    }
  },
  decline_meet: async (req, res) => {
    let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);
    let user = await Account.findById(decoded.id).select(["username", "image"]);

    if (user) {
      await CarMeet.findById(req.params.meet_id)
        .then((meet) => {
          if (meet.attendance.users.includes(user._id)) {
            meet.attendance.users.splice(
              meet.attendance.users.indexOf(String(user._id)),
              1
            );
            CarMeet.updateOne(
              { _id: meet._id },
              {
                attendance: {
                  users: meet.attendance.users,
                },
              },
              {
                new: true,
                runValidators: true,
              }
            )
              .then((updatedMeet) => res.status(200).json(user))
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
  },
  delete_meet: async (req, res) => {
    let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);
    let user = await Account.findById(decoded.id);

    if (user) {
      CarMeet.findById(req.params.meet_id).then((meet) => {
        if (String(user._id) === String(meet.host)) {
          CarMeet.findByIdAndDelete(meet._id)
            .then((result) => res.status(200).json(result))
            .catch((err) => console.log(err));
        }
      });
    }
  },
  user_meets: async (req, res) => {
    const user = await Account.find({ username: req.params.username });
    const user_id = String(user[0]._id);
    await CarMeet.find({
      "attendance.users": user_id,
    })
      .populate([
        { path: "host", select: ["name", "_id", "president"] },
        { path: "attendance.users", select: ["username", "image"] },
      ])
      .sort({ createdAt: -1 })
      .then((meets) => {
        console.log(user_id);
        console.log("we made it here");
        res.status(200).json(meets);
      })
      .catch((err) => console.log(err));
  },
  club_meets: async (req, res) => {
    const club = await CarClub.findById(req.params.club_id);
    const club_id = String(club._id);
    await CarMeet.find({
      host: club_id,
    })
      .populate([
        { path: "host", select: ["name", "_id", "president"] },
        { path: "attendance.users", select: ["username", "image"] },
      ])
      .sort({ createdAt: -1 })
      .then((meets) => {
        console.log("we made it here");
        res.status(200).json(meets);
      })
      .catch((err) => console.log(err));
  },
};
