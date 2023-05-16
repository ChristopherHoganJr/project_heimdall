const mongoose = require("mongoose");
const { Schema } = mongoose;

const CarMeetSchema = new Schema(
  {
    image: {
      type: String,
      required: [true, "your car meet must have a image"],
    },
    title: {
      type: String,
      required: [true, "your car meet must have a title"],
    },
    about: {
      type: String,
      required: [true, "you must tell everyone about your car meet"],
    },
    date: {
      type: String,
      required: [true, "you must tell everyone when your car meet is"],
    },
    time: {
      type: String,
      required: [true, "you must tell everyone the time of your car meet"],
    },
    location: {
      type: String,
      required: [true, "you must tell everyone the location of your car meet"],
    },
    locationLink: {
      type: String,
      required: [true, "you must tell everyone the link of your car meet"],
    },
    attendance: {
      users: [{ type: Schema.Types.ObjectId, ref: "Account" }],
    },
    host: { type: Schema.Types.ObjectId, ref: "CarClub", required: true },
  },
  { timestamps: true }
);

const CarMeet = mongoose.model("CarMeet", CarMeetSchema);
module.exports = CarMeet;
