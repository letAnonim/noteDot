const Users = require('./models/users.model.js');
const Notes = require('./models/notes.model.js');
const Messages = require('./models/messages.model.js');
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
          Notes.findByIdAndDelete(noteId, (err)=>{if(!err){
            socket.emit('deleteResponse', `A note with id: ${noteId} was deleted`)
          }})
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
      socket.on('findNote', async(userId, noteId)=>{
        let arr = []
        try{
          await Notes
          .findById(noteId, (err, note)=>{
            if(!err){
              if(note == null){socket.emit('ToNote', false)}
              else{arr = [ ...note.connectedUsers, userId ];
                // console.log(arr)
                socket.emit('ToNote', arr)}
              }})

          await Notes.findByIdAndUpdate(noteId, {connectedUsers:arr})
          await Users.findById()
        }catch(err){
          // console.error(err)
        }
      })
      socket.on('addMessage', data=>{
        try{
          Messages
            .create(data)
        }catch(err){
          console.error(err)
        }
      })
      socket.on('getMessages',noteId=>{
        try{Messages
          .find({port:noteId})
          .exec((err, messages)=>{
            if(!err){
                socket.emit('messages', messages)
            }
        })
        }catch(err){
          console.error(err)
        }
      })

      socket.on('saveNoteText', (text, noteId)=>{
        try {
          Notes
            .findByIdAndUpdate(noteId, {text:text})
            .exec((err, note)=>{
              if(!err){
                console.log(noteId, note)  
              }
          })
        } catch (error) {
          console.error(error)
        }
      })

      socket.on('getNote', noteId=>{
        try {
          Notes
            .findById(noteId)
            .exec((err, note)=>{
              if(!err){
                console.log(noteId, note)  
                socket.emit('aNote', note)
              }
          })
        } catch (error) {
          console.error(error)
        }
      })
    })
  }