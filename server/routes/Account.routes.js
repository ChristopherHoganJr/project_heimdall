const Account = require("../controllers/Account.controllers");

module.exports = (app) => {
  app.post("/api/account/register", Account.register);
  app.post("/api/account/login", Account.login);
  app.get("/api/account/userContext", Account.userContext);
};
