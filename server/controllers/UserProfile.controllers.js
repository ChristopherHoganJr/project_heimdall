const Account = require("../models/Account.models");
const UserProfile = require("../models/UserProfile.models");

const jwt = require("jsonwebtoken");

const fs = require("fs");
require("dotenv").config();

module.exports = {
  new_profile: async (req, res) => {
    let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);
    Account.findById(decoded.id)
      .then((user) => {
        UserProfile.create({
          account: user._id,
          realName: req.body.realName,
          biography: req.body.biography,
          image: req.body.image,
        })
          .then((profile) => res.status(200).json(profile))
          .catch((err) => console.log(err));
      })
      .catch((error) => res.status(400).json({ errors: "please log in" }));
  },
  get_profile: async (req, res) => {
    const user = await Account.find({ username: req.params.username });
    await UserProfile.find({ account: user[0]._id })
      .populate({ path: "account", select: ["username", "_id"] })
      .then((profile) => res.status(200).json(profile))
      .catch((err) => console.log(err));
  },
  edit_profile: async (req, res) => {
    console.log(req.body);
    let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);
    Account.findById(decoded.id).then((user) => {
      UserProfile.findByIdAndUpdate(
        req.params.profile_id,
        {
          realName: req.body.realName,
          biography: req.body.biography,
          image: req.body.image,
        },
        {
          new: true,
          runValidators: true,
        }
      )
        .then((profile) => res.status(200).json(profile))
        .catch((err) => console.log(err));
    });
  },
};
