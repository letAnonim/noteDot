const Notes = require('../models/notes.model.js');

//create new note
exports.create = (req, res)=>{
  // console.log(req.body)
  const note = new Notes({
    title: req.body.title,
    color: req.body.color,
    owner: req.body.owner,
    text: req.body.text,
    connectedUsers: req.body.connectedUsers,
  });
  note
  .save()
  .then((data)=>{ 
    res.send(data);
  })
    .catch((err) => {
      res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Notes.",
          });
        });  
};

// return all notes from the database.
exports.findAll = (req, res) => {
  Notes.find()
  .then((Notes) => {
    // console.log(Notes)
    res.send(Notes);
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Notes.",
    });
  });
};

//update note list by userId 
exports.findOne = (req, res) => {
  Notes.find({connectedUsers:req.params.userId})
  .then((notes) => {
    // console.log(notes)
    if (!notes) {
      return res.status(404).send({
        message: "Note not found with id " + req.params.userId,
      });
    }
    res.send(notes);
  })
  .catch((err) => {
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: "Note not found with id" + req.params.userId,
      });
    }
    return res.status(500).send({
      message: "Error retrieving note with id " + req.params.userId,
    });
  });
};

//delete note by noteId
exports.delete = (req, res) => {
  // console.log(req.params)
  Notes.findByIdAndRemove(req.params.noteId)
  .then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "Note not found with id " + req.params.userId,
      });
    }
    res.send({ message: "Note deleted successfully!" });
  })
  .catch((err) => {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        message: "User not found with id " + req.params.userId,
      });
    }
    return res.status(500).send({
      message: "Could not delete user with id " + req.params.userId,
    });
  });
};

//connect to note by the noteId
exports.connectToNote = async(req, res) => {
  let arr = []
  // console.log(req.params.noteId, req.params.userId);
  await Notes
  .findById(req.params.noteId, (err, note)=>{
    if(!err){
      if(note == null){return res.status(404).send({
        message: "note not found with id " + req.params.noteId,
      })}
      else{arr = [ ...note.connectedUsers, req.params.userId ];
        res.send(note);
      }}
  }).catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "note not found with id " + req.params.noteId,
        });
      }
      return res.status(500).send({
        message: "Error updating note with id " + req.params.noteId,
      });
    });
    await Notes.findByIdAndUpdate(req.params.noteId, {connectedUsers:arr})
};

// Update a note identified by the noteId
exports.update = async(req, res) => {
  if(req.body.type=='text'){
    await Notes.findByIdAndUpdate(req.body.noteId, {text:req.body.textValue}).then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.body.noteId,
        });
      }
      Notes.findById(req.body.noteId)
      .then((note) => {
        if (!note) {
          return res.status(404).send({
            message: "Note not found with id " + req.body.userId,
          });
        }else
        res.send(note);
      })
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
        message: "note not found with id " + req.body.noteId,
      })}
      return res.status(500).send({
        message: "Error updating note with id " + req.body.noteId,
      });
    });
  }
  else if(req.body.type=='params'){
    await Notes.findByIdAndUpdate(req.body.noteId, {title:req.body.title, color:req.body.color}).then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.body.noteId,
        });
      }else{
        Notes.findById(req.body.noteId)
        .then((note) => {
          if (!note) {
            return res.status(404).send({
              message: "Note not found with id " + req.body.userId,
            });
          }else
          res.send(note);
        })
        }
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
        message: "note not found with id " + req.body.noteId,
      })}
      return res.status(500).send({
        message: "Error updating note with id " + req.body.noteId,
      });
    });
  }
  else(res.status(500).send({
    message: `Request type is invalid( ${req.body.type} )`
  }))
};
