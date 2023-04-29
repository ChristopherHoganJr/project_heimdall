const Account = require("../models/Account.models");
const CarMeet = require("../models/CarMeet.models");

module.exports = {
  new_meet: async (req, res) => {
    // let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);
    Account.findById("644c0458c2f9f2ac322bdb8c")
      .then((user) => {
        CarMeet.create({
          host: user._id,
          about: req.body.about,
          title: req.body.title,
        }).then((post) => res.status(200).json(post));
      })

      .catch((error) => res.status(400).json({ errors: "please log in" }));
  },
  get_recent: async (req, res) => {
    CarMeet.find()
      .then((meets) => res.status(200).json(meets))
      .catch((err) => res.status(400).json(err));
  },
};
