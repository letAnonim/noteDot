const Users = require("../models/users.model.js");

//create new user
exports.create = (req, res) => {
	const user = new Users({
		name: req.body.name,
		age: req.body.age,
		password: req.body.password,
		notes: req.body.notes,
	});
	user.save()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while creating the users.",
			});
		});
};

// return all users from the database.
exports.findAll = (req, res) => {
	Users.find()
		.then((users) => {
			// console.log(users);
			res.send(users);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving users.",
			});
		});
};

// find a one user with a userId
exports.findOne = (req, res) => {
	console.log(req)
	Users.findById(req.params.userId)
		.then((user) => {
			if (!user) {
				return res.status(404).send({
					message: "User not found with id " + req.params.userId,
				});
			}
			res.send(user);
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: "User not found with id " + req.params.userId,
				});
			}
			return res.status(500).send({
				message: "Error retrieving user with id " + req.params.userId,
			});
		});
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
	// Find user and update it with the request body
	Users.findByIdAndUpdate(req.params.userId, req.body, { new: true })
		.then((user) => {
			if (!user) {
				return res.status(404).send({
					message: "User not found with id " + req.params.userId,
				});
			}
			res.send(user);
		})
		.catch((err) => {
			if (err.kind === "ObjectId") {
				return res.status(404).send({
					message: "User not found with id " + req.params.userId,
				});
			}
			return res.status(500).send({
				message: "Error updating user with id " + req.params.userId,
			});
		});
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
	Users.findByIdAndRemove(req.params.userId)
		.then((user) => {
			if (!user) {
				return res.status(404).send({
					message: "User not found with id " + req.params.userId,
				});
			}
			res.send({ message: "User deleted successfully!" });
		})
		.catch((err) => {
			if (err.kind === "ObjectId" || err.name === "NotFound") {
				return res.status(404).send({
					message: "User not found with id " + req.params.userId,
				});
			}
			return res.status(500).send({
				message: "Could not delete user with id " + req.params.userId,
			});
		});
};
