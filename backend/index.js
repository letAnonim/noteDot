const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const port = 6666
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a User

// app.post("/users", async (req, res) => {
//   try {
//     const { description } = req.body;
//     const newUser = await pool.query(
//       "INSERT INTO users (name, password, age ) VALUES($1) RETURNING *",
//       [description]
//     );

//     res.json(newUser.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

//get all todos

app.get("/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a User

// app.get("/users/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const User = await pool.query("SELECT * FROM users WHERE todo_id = 1$", [
//       id
//     ]);
//     res.json(User.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

//update a todo

// app.put("/users/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { description } = req.body;
//     const updateTodo = await pool.query(
//       "UPDATE todo SET description = $1 WHERE todo_id = $2",
//       [description, id]
//     );

//     res.json("Todo was updated!");
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// //delete a todo

// app.delete("/users/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
//       id
//     ]);
//     res.json("Todo was deleted!");
//   } catch (err) {
//     console.log(err.message);
//   }
// });



// io.on('connection', socket=>{
//     console.log('a user was connected!!')
//     socket.on('chat message', msg=>{
//         console.log(msg);
//         io.emit('chat message', msg)
//     })
// })

app.listen(port, ()=>{
    console.log('server is running on port:'+ port)
})