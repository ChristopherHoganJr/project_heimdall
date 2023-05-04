const CarClub = require("../controllers/CarClub.controllers");

module.exports = (app) => {
  app.post("/api/carclub/new", CarClub.new_club);
  app.get("/api/carclub/", CarClub.get_clubs);
  app.get("/api/carclub/:club_id", CarClub.get_single_club);
  app.delete("/api/carclub/:club_id", CarClub.delete_club);
  app.get("/api/user/:username/carclubs", CarClub.user_clubs);
  app.put("/api/carclub/join/:club_id", CarClub.join_club);
  app.put("/api/carclub/leave/:club_id", CarClub.leave_club);
  app.put("/api/carclub/update/:club_id", CarClub.update_club);
};
