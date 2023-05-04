const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserProfileSchema = new Schema(
  {
    account: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    image: {
      type: String,
    },
    realName: {
      type: String,
    },
    biography: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);
module.exports = UserProfile;
