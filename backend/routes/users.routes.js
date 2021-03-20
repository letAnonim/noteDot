// const auth = require("../middleware/auth");
module.exports = (app) => {
    const users = require("../controllers/users.controller");

	// Create a new client
	app.post("/api/users", users.create);

	// Retrieve all Users
	app.get("/api/users", users.findAll);

	// Retrieve a single client with clientId
	app.get("/api/users/:userId", users.findOne);

	// Update a client with clientId
	// app.post("/api/user/update", users.update);

	// Update a client photo with clientId
	app.put("/api/user/photoupdate", users.update);

	// Delete a client with clientId
	app.delete("/api/users/:userId", users.delete);
};
