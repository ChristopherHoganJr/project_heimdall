const Account = require("../models/Account.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = {
  register: async (req, res) => {
    console.log(req.body);
    let email_exist = await Account.findOne({ email: req.body.email });
    if (email_exist)
      return res.status(400).json({
        errors: {
          email: {
            message: "this email already exists",
          },
        },
      });
    let username_exist = await Account.findOne({ username: req.body.username });
    if (username_exist)
      return res.status(400).json({
        errors: {
          username: {
            message: "this username is already taken",
          },
        },
      });
    if (!email_exist && !username_exist) {
      Account.create(req.body)
        .then((user) => {
          const usertoken = jwt.sign(
            {
              id: user._id,
            },
            process.env.SECRET_KEY
          );

          res
            .cookie("usertoken", usertoken, process.SECRET_KEY, {
              httpOnly: true,
            })
            .json({ id: user._id, username: user.username });
        })
        .catch((err) => res.status(400).json(err));
    }
  },
  login: async (req, res) => {
    const user = await Account.findOne({ email: req.body.email });

    if (user === null) {
      return res.status(400).json({
        errors: {
          email: {
            message: "this email has not been registered",
          },
        },
      });
    }

    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!correctPassword) {
      return res.status(400).json({
        errors: {
          email: {
            message: "this was not the right password",
          },
        },
      });
    }

    const usertoken = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY
    );

    res
      .cookie("usertoken", usertoken, process.SECRET_KEY, {
        httpOnly: true,
      })
      .json({ id: user._id, username: user.username });
  },
  userContext: async (req, res) => {
    if (req?.cookies?.usertoken == null)
      return res.status(400).json({ message: "Please log in" });
    else {
      let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);

      Account.findById(decoded.id)
        .then((user) => {
          res.status(200).json({
            username: user.username,
            id: user._id,
          });
        })
        .catch((error) => res.status(400).json({ errors: "please log in" }));
    }
  },
  logout: (req, res) => {
    res.clearCookie("usertoken").sendStatus(200);
  },
  edit_profile: async (req, res) => {
    let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);
    Account.findByIdAndUpdate(decoded.id, {
      realName: req.body.realName,
      biography: req.body.biography,
      image: req.body.image,
    })
      .then((profile) => res.status(200).json(profile))
      .catch((err) => console.log(err));
  },
  get_profile: async (req, res) => {
    await Account.find({ username: req.params.username })
      .select(["username", "realName", "biography", "image"])
      .then((user) => res.status(200).json(user))
      .catch((err) => console.log(err));
  },
};
