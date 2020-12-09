require('dotenv').config()
const MONGODB_URL = process.env.DATABASE;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const server = require('http').Server(app)
const io = require('socket.io')(server);
app.use(cors());
const port = process.env.PORT || 6000;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// const users = require('./controllers/users.controller')
mongoose
.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
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
  // app.get("/api/users", users.findAll);
  // const webBuildFolderName = "build";
  // app.use(express.static(webBuildFolderName));
  // app.get("*", (req, res) => {
    //   res.sendFile(
      //     path.resolve(__dirname, `../${webBuildFolderName}`, "index.html")
      //   );
      // });
      
      
      
      
      
      
      