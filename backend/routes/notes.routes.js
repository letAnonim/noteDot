module.exports = (app) => {
    const notes = require("../controllers/notes.controller");

	// Retrieve all notes
	app.get("/api/notes", notes.findAll);
	
	// Retrieve a single notes list with clientId
	app.get("/api/notes/:userId", notes.findOne);
	
	// Create a new note
	app.post("/api/notes", notes.create);

	// update a note with noteId
	app.put("/api/notes/:noteId", notes.update);
	
	// Delete a note with noteId
	app.delete("/api/notes/:userId/:noteId", notes.delete);
};
