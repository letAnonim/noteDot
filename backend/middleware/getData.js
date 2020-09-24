const mongoose = require('mongoose');
const url = "mongodb+srv://superUser:194519@cluster0.aynw0.mongodb.net/test?retryWrites=true&w=majority";
const { MongoClient } = require("mongodb");
const client = new MongoClient(url, {useUnifiedTopology: true});

async function getData() {
  try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db('NoteDot');
        // Use the collection "Users"
        const col = db.collection("Users");
        // Construct a document
        //  const p = await col.insertMany(personDocument);
        // Find one document
        const myDoc = await col.find().toArray();
        // Print to the console
        console.log(myDoc)
      } catch (err) {
        console.log(err.stack);
    }
    finally {
      await client.close();
  }
}
const get = (req, res, next)=>{
    getData().catch(console.dir);
    next()
}
module.exports = {get}