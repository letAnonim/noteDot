const bcrypt = require('bcrypt');
const saltRounds = 10;
const Users = require('./models/users.model.js');
const Notes = require('./models/notes.model.js');
const Messages = require('./models/messages.model.js');
// const { ObjectId } = require('mongodb');
module.exports = io =>{ 
    io.on('connection', socket=>{
      console.log('user connected')
      socket.on('checkLog', (login, password)=>{
        // console.log(login, password)
        try{
          Users
            .findOne({name:login})
            .exec((err, user)=>{
              if(!err){
                if(user != null){
                  bcrypt.compare(password, user.password).then(function(result) {
                    (result ==false )?(socket.emit('answerLog', false)):(socket.emit('answerLog', true, user))
                  });
                  
                }
                else{
                  socket.emit('answerLog', false)
                }   
              }
            })
        }catch(err){
          console.error(err)
        }
      })
      socket.on('regUser', data=>{
        try{
          Users
            .findOne({name:data.name})
            .exec((err, user)=>{
              if(!err){
                if(user != null){
                  socket.emit('answerReg', 1)
                }
                else if(!isFinite(data.age)){
                  socket.emit('answerReg', 2)
                }
                else if(data.password != data.conPassword){
                  socket.emit('answerReg', 3)
                }
                else{
                  socket.emit('answerReg', 4)
                  bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(data.password, salt, function(err, hash) {
                        data.password = hash
                        Users.create(data);
                    });
                  });
                }
              }   
            })
        
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
          //   .exec((err, note)=>{
          //     if(!err){
          //       socket.emit('note', note)
          //     }
          //   })
            
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

      socket.on('saveNoteText', (recivedText, noteId)=>{
        try {
          Notes
            .findByIdAndUpdate(noteId, {text:recivedText})
            .exec((err, note)=>{
              if(!err){
                // console.log(noteId, note)  
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
        } catch (error) {
          console.error(error)
        }
      })
      socket.on('getConnectedUsers', conUsers=>{
        try {
          Users.find().where('_id').in(conUsers).exec((err, data) => {if(!err){
            socket.emit('conUsers', data)
          }});
            
        } catch (error) {
          console.error(error)
        }
      })
    })
  }