const Account = require("../models/Account.models");
const CarMeet = require("../models/CarMeet.models");

const jwt = require("jsonwebtoken");

module.exports = {
  new_meet: async (req, res) => {
    let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);
    Account.findById(decoded.id)
      .then((user) => {
        CarMeet.create({
          host: user._id,
          about: req.body.about,
          title: req.body.title,
          attendance: {
            users: user._id,
          },
        }).then((post) => res.status(200).json(post));
      })

      .catch((error) => res.status(400).json({ errors: "please log in" }));
  },
  get_meet: async (req, res) => {
    (await CarMeet.findById(req.params.meet_id))
      .populate({ path: "host", select: ["username", "_id"] })
      .then((meet) => res.status(200).json(meet))
      .catch((err) => console.log(err));
  },
  get_recent: async (req, res) => {
    CarMeet.find()
      .populate({ path: "host", select: "username" })
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
          title: req.body.title,
          about: req.body.about,
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
    let user = await Account.findById(decoded.id);
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
              .then((updatedMeet) => res.status(200).json(user._id))
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log("meet does not exist"));
    }
  },
  decline_meet: async (req, res) => {
    let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);
    let user = await Account.findById(decoded.id);

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
              .then((updatedMeet) => res.status(200).json(user._id))
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
};
