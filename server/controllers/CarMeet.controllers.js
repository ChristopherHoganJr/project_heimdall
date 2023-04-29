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
        }).then((post) => res.status(200).json(post));
      })

      .catch((error) => res.status(400).json({ errors: "please log in" }));
  },
  get_meet: async (req, res) => {
    CarMeet.findById(req.params.meet_id)
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
    let meet = await CarMeet.findById(req.params.meet_id).populate("host");

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
};
