const Account = require("../models/Account.models");
const CarClub = require("../models/CarClub.models");

const jwt = require("jsonwebtoken");

module.exports = {
  get_clubs: async (req, res) => {
    CarClub.find()
      .populate({ path: "president", select: "username" })
      .sort({ createdAt: -1 })
      .then((clubs) => res.status(200).json(clubs))
      .catch((err) => console.log(err));
  },
  new_club: async (req, res) => {
    let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);
    let user = await Account.findById(decoded.id);

    if (user) {
      CarClub.create({
        name: req.body.name,
        about: req.body.about,
        tags: req.body.tags.split(", "),
        president: user._id,
      })
        .then((club) => res.status(200).json(club))
        .catch((error) => res.status(400).json({ erros: "please log in" }));
    } else {
      res.status(200).json({ error: "please log in" });
    }
  },
  get_single_club: async (req, res) => {
    (await CarClub.findById(req.params.club_id))
      .populate({ path: "president", select: "username" })
      .then((club) => res.status(200).json(club))
      .catch((err) => res.status(400).json(err));
  },
};
