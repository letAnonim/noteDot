const Users = require('./models/users.model.js');
const Notes = require('./models/notes.model.js');
const { ObjectId } = require('mongodb');
module.exports = io =>{ 
    io.on('connection', socket=>{
      console.log('user connected')
      socket.on('getUsers', ()=>{
        try{
          Users
            .find({})
            .exec((err, users)=>{
                if(!err){
                    socket.emit('users', users)
                }
            })
        }catch(err){
          console.error(err)
        }
      })
      socket.on('regUser', data=>{
        try{
          Users
            .create(data)
        }catch(err){
          console.error(err)
        }
      })
      socket.on('getNotes',noteId=>{
        try{Notes
          .find({connectedUsers:noteId})
          .exec((err, notes)=>{
            if(!err){
                socket.emit('notes', notes)
            }
        })
        }catch(err){
          console.error(err)
        }
      })
      socket.on('addNote', data=>{
        try{
          Notes
            .create(data)
        }catch(err){
          console.error(err)
        }
      })
      socket.on('deleteNote', noteId=>{
        try{
          db('NoteDot').collection("notes").deleteOne({_id:noteId})
          socket.emit('deleteResponse', `A note with id: ${noteId} was deleted`)
          // .findOne({_id: noteId})
            // .exec((err, note)=>{
            //   if(!err){
            //     socket.emit('note', note)
            //   }
            // })
            
        }catch(err){
          console.error(err)
        }
        
      }) 
      socket.emit('not', Notes)
    })
  }