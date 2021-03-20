const Users = require("../models/users.model.js");
// const ImageSchema = require("../models/photo.js");
const multer = require('multer');
// const buffer = require('buffer/').Buffer; ?????????
// const { response } = require("express");

 
// const upload = multer({ storage: storage });


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
	// console.log(req)
	Users.findById(req.params)
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

// Update a user photo by the userId in the request
exports.photoUpdate = (req, res) => {
	// const photo = {
	// 	name: req.body.photo.name,
	// 	desc: (req.body.desc)?req.body.desc:undefined,
	// 	img: {
	// 		data: req.body.photo.uri,
	// 		contentType: req.body.photo.type
	// 	}
	// }
	// Users.findByIdAndUpdate({_id: req.body.id},{photo: photo} ).then((user) => {
	// 	let resPhoto = {
	// 		name: user.photo.name,
	// 		desc: user.photo.desc,
	// 		img: {
	// 			data: Buffer.from(JSON.parse(JSON.stringify(user.photo.img.data)).data).toString('utf8'),
	// 			contentType: user.photo.img.contentType
	// 		}
	// 	}
	// 	console.log(photo)
	// 	console.log(resPhoto)
	// 	res.send(photo);
	// })
	// .catch((err) => {
	// 	res.status(500).send({
	// 		message:
	// 			err.message ||
	// 			"Some error occurred while retrieving users.",
	// 	});
	// });
};

exports.update = async(req, res) => {
	if(req.body.type=='photo'){
		const photo = {
			name: req.body.data.photo.name,
			desc: (req.body.data.desc)?req.body.desc:undefined,
			img: {
				data: req.body.data.photo.uri,
				contentType: req.body.data.photo.type
			}
		}
		Users.findByIdAndUpdate({_id: req.body.data.id},{photo: photo} ).then(() => {
			// let resPhoto = {
			// 	name: user.photo.name,
			// 	desc: user.photo.desc,
			// 	img: {
			// 		data: Buffer.from(JSON.parse(JSON.stringify(user.photo.img.data)).data).toString('utf8'),
			// 		contentType: user.photo.img.contentType
			// 	}
			// }
			res.send(photo);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving users.",
			});
		});
	}
  };

// delete note by note id
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
