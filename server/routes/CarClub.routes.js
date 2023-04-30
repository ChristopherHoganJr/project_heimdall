const CarClub = require("../controllers/CarClub.controllers");

module.exports = (app) => {
  app.post("/api/carclub/new", CarClub.new_club);
  app.get("/api/carclub/", CarClub.get_clubs);
  app.get("/api/carclub/:club_id", CarClub.get_single_club);
};
