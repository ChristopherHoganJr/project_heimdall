const CarMeet = require("../controllers/CarMeet.controllers");

module.exports = (app) => {
  app.get("/api/carmeet/", CarMeet.get_recent);
  app.get("/api/carmeet/:meet_id", CarMeet.get_meet);
  app.delete("/api/carmeet/:meet_id", CarMeet.delete_meet);
  app.post("/api/carmeet/new", CarMeet.new_meet);
  app.put("/api/carmeet/update/:meet_id", CarMeet.update_meet);
  app.put("/api/carmeet/attend/:meet_id", CarMeet.attend_meet);
  app.put("/api/carmeet/decline/:meet_id", CarMeet.decline_meet);
  app.get("/api/user/:username/carmeets", CarMeet.user_meets);
  app.get("/api/carclub/:club_id/carmeets", CarMeet.club_meets);
};
