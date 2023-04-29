const CarMeet = require("../controllers/CarMeet.controllers");

module.exports = (app) => {
  app.get("/api/carmeet/", CarMeet.get_recent);
  app.post("/api/carmeet/new", CarMeet.new_meet);
};
