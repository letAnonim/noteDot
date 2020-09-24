const Users = require('./models/users.models.js');
module.exports = io =>{ 
    io.on('connection', socket=>{
      console.log('user connected')

      
      socket.on('getUsers', ()=>{
        Users
            .find({})
            .exec((err, users)=>{
                if(!err){
                    socket.emit('users', users)
                }
            })
      }) 
    })
  }