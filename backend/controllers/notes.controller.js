const Notes = require('../models/notes.model.js');

//create new note
exports.create = (req, res)=>{
  console.log(req.body)
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
      }
      
// return all notes from the database.
exports.findAll = (req, res) => {
  Notes.find()
  .then((Notes) => {
    console.log(Notes)
    res.send(Notes);
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Notes.",
    });
  });
};
      
  // find a one note with a noteId
  exports.findOne = (req, res) => {
    // console.log(req.params)
    console.log(req.params.userId)
    Notes.find({connectedUsers:req.params.userId})
    // .exec((err, notes)=>{
    //   if(!err){
    //       socket.emit('notes', notes)
    //   }
    .then((notes) => {
      console.log(notes)
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
  
  // Update a note identified by the noteId in the request
  exports.update = async(req, res) => {
    let arr = []
    console.log(req.params.noteId, req.params.userId);
    await Notes
    .findById(req.params.noteId, (err, note)=>{
      if(!err){
        if(note == null){return res.status(404).send({
          message: "note not found with id " + req.params.noteId,
        })}
        else{arr = [ ...note.connectedUsers, req.params.userId ];
          console.log(arr);
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
  }
//     Notes.findByIdAndUpdate(req.params.noteId, req.body, { new: true })
//     .then((note) => {
//       if (!note) {
//         return res.status(404).send({
//           message: "note not found with id " + req.params.noteId,
//         });
//       }
//       res.send(note);
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId") {
//         return res.status(404).send({
//         message: "note not found with id " + req.params.noteId,
//       });
//     }
//     return res.status(500).send({
//       message: "Error updating note with id " + req.params.noteId,
//     });
//   });


// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  console.log(req.params)
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