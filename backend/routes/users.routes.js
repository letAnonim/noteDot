// const auth = require("../middleware/auth");
// 

module.exports = (app) => {
    const users = require("../controllers/users.controller");

	// Create a new client
	app.post("/api/users", users.create);

	// Retrieve all Users
	app.get("/api/users", users.findAll);

	// Retrieve a single client with clientId
	app.get("/api/users/:userId", users.findOne);

	// Update a client with clientId
	app.put("/api/users/:userId", users.update);

	// Delete a client with clientId
	app.delete("/api/users/:userId", users.delete);
};
