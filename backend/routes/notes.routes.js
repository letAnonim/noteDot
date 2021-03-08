module.exports = (app) => {
    const notes = require("../controllers/notes.controller");

	// Retrieve all notes
	// app.get("/api/notes", notes.findAll);
	
	// Retrieve a single notes list with clientId
	app.get("/api/notes/:userId", notes.findOne);
	
	// Create a new note
	app.post("/api/notes", notes.create);

	// Delete a note with noteId
	app.delete("/api/notes/:userId/:noteId", notes.delete);

	// find a note with noteId
	app.put("/api/notes/:noteId/:userId", notes.connectToNote);

	// update a note with noteId
	app.put("/api/notes/text", notes.update);
	
};
