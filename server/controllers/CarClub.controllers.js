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
        image: req.body.image,
        members: {
          users: [user._id],
        },
      })
        .then((club) => res.status(200).json(club))
        .catch((error) => res.status(400).json({ erros: "please log in" }));
    } else {
      res.status(200).json({ error: "please log in" });
    }
  },
  update_club: async (req, res) => {
    let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);
    let user = await Account.findById(decoded.id);
    let club = await CarClub.findById(req.params.club_id);

    if (String(user._id) === String(club.president._id)) {
      CarClub.findByIdAndUpdate(
        club._id,
        {
          name: req.body.name,
          about: req.body.about,
          tags: req.body.tags.split(", "),
          image: req.body.image,
        },
        {
          new: true,
          runValidators: true,
        }
      )
        .then((updatedClub) => res.status(200).json(updatedClub))
        .catch((err) => console.log(err));
    } else {
      res.status(400).json("you are not the host");
    }
  },
  get_single_club: async (req, res) => {
    (await CarClub.findById(req.params.club_id))
      .populate([
        { path: "president", select: "username" },
        { path: "members.users", select: ["username", "image"] },
      ])
      .then((club) => res.status(200).json(club))
      .catch((err) => res.status(400).json(err));
  },
  delete_club: async (req, res) => {
    let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);
    let user = await Account.findById(decoded.id);

    if (user) {
      CarClub.findById(req.params.club_id).then((club) => {
        if (String(user._id) === String(club.president)) {
          CarClub.findByIdAndDelete(club._id)
            .then((result) => res.status(200).json(result))
            .catch((err) => console.log(err));
        }
      });
    }
  },
  user_clubs: async (req, res) => {
    const user = await Account.find({ username: req.params.username });
    const user_id = String(user[0]._id);
    await CarClub.find({
      "members.users": user_id,
    })
      .populate({ path: "president", select: "username" })
      .then((clubs) => {
        res.status(200).json(clubs);
      })
      .catch((err) => console.log(err));
  },
  join_club: async (req, res) => {
    let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);
    let user = await Account.findById(decoded.id).select(["username", "image"]);
    if (user) {
      await CarClub.findById(req.params.club_id)
        .then((club) => {
          if (!club.members.users.includes(user._id)) {
            CarClub.updateOne(
              { _id: club._id },
              {
                members: {
                  users: [...club.members.users, user._id],
                },
              },
              {
                new: true,
                runValidators: true,
              }
            )
              .then((updatedClub) => res.status(200).json(user))
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log("club does not exist"));
    }
  },
  leave_club: async (req, res) => {
    let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);
    let user = await Account.findById(decoded.id).select(["username", "image"]);

    if (user) {
      await CarClub.findById(req.params.club_id)
        .then((club) => {
          if (club.members.users.includes(user._id)) {
            club.members.users.splice(
              club.members.users.indexOf(String(user._id)),
              1
            );
            CarClub.updateOne(
              { _id: club._id },
              {
                members: {
                  users: club.members.users,
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
};
