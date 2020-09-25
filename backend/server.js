
// mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});


// io.on('connection', socket => {
  //   console.log('client connected on websocket!');
  //   socket.on('disconnect', ()=>{
    //     console.log('client disconnected from websocket!');
    //   });
    //   socket.emit('message', 'some message text')
    // });
    // async function getData() {
      //   try {
        //         await client.connect();
        //         console.log("Connected correctly to server");
    //         const db = client.db('NoteDot');
    //         const col = db.collection("Users");
    //         //  const p = await col.insertMany(personDocument);
    //         users = await col.find().toArray()
    //       } catch (err) {
      //         console.log(err.stack);
      //     }
      //     finally {
        //       io.on('connection', socket=>{
          //         socket.emit('users', users);
          
          //       })
          //       // console.log(myDoc)
          //       await client.close();
          //   }
          // }
          // getData().catch(console.dir);
          // async function setNotes() {
            //   try {
              //         await client.connect();
              //           console.log("Connected correctly to server");
              //           const db = client.db('NoteDot');
              //           const col = db.collection("Notes");
              //           io.on('connection', socket=>{
                //             socket.on('notes',msg => {
                  //               col.insertMany(msg)
    //             }) 
    //           })
    //          const p = await col.insertMany();
    //         // notes = await col.find().toArray()
    //       } catch (err) {
      //         console.log(err.stack);
      
      //     }
      //     finally {
        
        //       // console.log(myDoc)
        //       await client.close();
        //   }
        // }
        // setNotes().catch(console.dir);
        
        
        
        
//-----------------------------------------------------------------//
const MONGODB_URL = "mongodb+srv://superUser:194519@cluster0.aynw0.mongodb.net/NoteDot?retryWrites=true&w=majority";
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const server = require('http').Server(app)
const io = require('socket.io')(server);
app.use(cors());
const port = process.env.PORT || 6666;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose
.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
    console.log("Successfully connected to the database");
    server.listen(port, () => {
      console.log("Server is listening on port: " + port);
    });
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
  
  require('./routes').setUpRouter(app);
  require('./sockets.js')(io);
  // const webBuildFolderName = "build";
  // app.use(express.static(webBuildFolderName));
  // app.get("*", (req, res) => {
    //   res.sendFile(
      //     path.resolve(__dirname, `../${webBuildFolderName}`, "index.html")
      //   );
      // });
      
      
      
      
      
      
      