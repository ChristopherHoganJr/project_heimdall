const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserProfileSchema = new Schema({
  realName: {
    type: String,
  },
  biography: {
    type: String,
  },
});
