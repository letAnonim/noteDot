module.exports = (app) => {
    const notes = require("../controllers/notes.controller");

	// Create a new client
	// app.post("/api/notes", notes.create);

	// Retrieve all notes
	app.get("/notes", notes.findAll);

	// Retrieve a single client with clientId
	app.get("/api/notes/:noteId", notes.findOne);

	// Update a client with clientId
	app.put("/api/notes/:noteId", notes.update);

	// Delete a client with clientId
	app.delete("/api/notes/:noteId", notes.delete);
};
