const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const DB = process.env.MONGODB_URI;
require("./config/mongoose.config")(DB);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(__dirname + "/uploads"));

// routes
require("./routes/Account.routes")(app);
require("./routes/CarMeet.routes")(app);
require("./routes/CarClub.routes")(app);
// require("./routes/UserProfile.routes")(app);
require("./routes/Upload.routes")(app);

PORT = 8000;
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
