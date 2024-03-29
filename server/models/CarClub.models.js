const mongoose = require("mongoose");
const { Schema } = mongoose;

const CarClubSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "your club must have a name"],
      unique: true,
    },
    image: {
      type: String,
      required: [true, "your car club must have a image"],
    },
    about: {
      type: String,
      required: [true, "you must tell everyone about your car meet"],
    },
    tags: {
      type: [String],
      required: [true, "you must tell everyone about your car meet"],
    },
    members: {
      users: [{ type: Schema.Types.ObjectId, ref: "Account" }],
    },
    president: { type: Schema.Types.ObjectId, ref: "Account", required: true },
  },
  { timestamps: true }
);

const CarClub = mongoose.model("CarClub", CarClubSchema);
module.exports = CarClub;
