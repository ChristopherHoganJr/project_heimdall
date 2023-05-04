const Account = require("../controllers/Account.controllers");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  app.post("/api/account/register", Account.register);
  app.post("/api/account/login", Account.login);
  app.get("/api/account/userContext", Account.userContext);
  app.get("/api/account/logout", Account.logout);
  app.get("/api/profile/:username", Account.get_profile);
  app.put("/api/profile/:profile_id", authenticate, Account.edit_profile);
};
