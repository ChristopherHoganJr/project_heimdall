const mongoose = require("mongoose");
const { Schema } = mongoose;

const CarMeetSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "your car meet must have a title"],
    },
    about: {
      type: String,
      required: [true, "you must tell everyone about your car meet"],
    },
    attendance: {
      users: [{ type: Schema.Types.ObjectId, ref: "Account" }],
    },
    host: { type: Schema.Types.ObjectId, ref: "Account", required: true },
  },
  { timestamps: true }
);

const CarMeet = mongoose.model("CarMeet", CarMeetSchema);
module.exports = CarMeet;
