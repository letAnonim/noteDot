const bcrypt = require('bcrypt');
const saltRounds = 10;
const Users = require('./models/users.model.js');
const Notes = require('./models/notes.model.js');
const Messages = require('./models/messages.model.js');
// const { ObjectId } = require('mongodb');
module.exports = io =>{ 
    io.on('connection', socket=>{
      // console.log('user connected')
      socket.on('checkLog', (login, password)=>{
        // console.log(login, password)
        try{
          Users
            .findOne({name:login})
            .exec((err, user)=>{
              if(!err){
                if(user != null){
                  bcrypt.compare(password, user.password).then(function(result) {
                    (result ==false )?(socket.emit('answerLog', false, undefined)):(
                      socket.emit('answerLog', true, {
                        userId:user._id,
                        userName:user.name,
                        userAge:user.age,
                        userRegDate:user.createdAt,
                        photo:{
                          name: user.photo.name,
                          desc: user.photo.desc,
                          img: {
                            data: Buffer.from(JSON.parse(JSON.stringify(user.photo.img.data)).data).toString('utf8'),
                            contentType: user.photo.img.contentType
                          }
                        }
                      }))
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

    })
  }