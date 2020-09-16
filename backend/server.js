
const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        

const url = "mongodb+srv://superUser:194519@cluster0.aynw0.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(url);

const dbName = "NoteDot";
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);

         // Use the collection "people"
         const col = db.collection("Users");

         // Construct a document                                                                                                                                                              
         let personDocument = {
             "name": { "first": "Alan", "last": "Turing" },
             "birth": new Date(1912, 5, 23), // June 23, 1912                                                                                                                                 
             "death": new Date(1954, 5, 7),  // June 7, 1954                                                                                                                                  
             "contribs": [ "Turing machine", "Turing test", "Turingery" ],
             "views": 1250000
         }

         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(personDocument);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);

        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}

run().catch(console.dir);










// const express = require("express");
// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// const mongoose = require("mongoose");
// const MongoClient = require('mongodb').MongoClient;

// mongoose.connection.on("error", (err) => {
//   console.log("Mongoose Connection ERROR: " + err.message);
// });

// mongoose.connection.once("open", () => {
//   console.log("MongoDB Connected!");
// });

// const uri = "mongodb+srv://superUser:<password>@cluster0.aynw0.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { 
//   useUnifiedTopology: true,
//   useNewUrlParser: true });

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// app.listen(6666, () => {
//   console.log("Server listening on port 8000");
// });