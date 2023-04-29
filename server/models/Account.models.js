const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const AccountSchema = Schema(
  {
    username: {
      type: String,
      required: [true, "You must have a unique username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "you must enter a valid email"],
      unique: true,
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "you must have a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "you must enter a password"],
      validate: {
        validator: (val) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/.test(val),
        message:
          "your password must at least 8 characters long, have at least 1 lower case letter, 1 upper case letters, 1 number, and 1 special character",
      },
    },
  },
  { timestamps: true }
);

AccountSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

AccountSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "password must match confirm password");
  }
  next();
});

AccountSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

const Account = mongoose.model("Account", AccountSchema);
module.exports = Account;
