const UserProfile = require("../controllers/UserProfile.controllers");
const { authenticate } = require("../config/jwt.config");

const multer = require("multer");
const imageUpload = multer({ dest: "./uploads/" });

module.exports = (app) => {
  app.post("/api/profile/new", authenticate, UserProfile.new_profile);
  app.get("/api/profile/:username", UserProfile.get_profile);
  app.put("/api/profile/:profile_id", authenticate, UserProfile.edit_profile);
};
