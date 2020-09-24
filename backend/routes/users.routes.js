// const auth = require("../middleware/auth");

module.exports = (app) => {
  const Users = require("../controllers/users.controller.js");

  // Create a new client
  app.post("/api/users", Users.create);

  // Retrieve all Users
  app.get("/api/users", Users.findAll);

  // Retrieve a single client with clientId
  app.get("/api/users/:userId", Users.findOne);

  // Update a client with clientId
  app.put("/api/users/:userId", Users.update);

  // Delete a client with clientId
  app.delete("/api/users/:userId", Users.delete);
};