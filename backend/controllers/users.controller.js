const bcrypt = require('bcrypt');
const saltRounds = 10;
const Users = require("../models/users.model.js");


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
	
//create new user
exports.create = async(req, res) => {
	await Users
	.findOne({name:req.body.name})
	.exec((err, user)=>{
		if(!err){
			if(user != null){
				res.send('1')
			}
			else if(!isFinite(req.body.age)){
				res.send('2')
			}
			else if(req.body.password != req.body.conPassword){
				res.send('3')
			}
			else{
				res.send('4')
				bcrypt.genSalt(saltRounds, function(err, salt) {
					bcrypt.hash(req.body.password, salt, function(err, hash) {
						const User = new Users({
							name: req.body.name,
							age: req.body.age,
							password: hash,
							notes: req.body.notes,
							photo: {}
						});
						User.save();
					});
				});
			}
		} 
	})
};

//Login user
exports.logging = async(req, res) => {
	try {
		await Users
		.findOne({name:req.body.login})
		.exec((err, user)=>{
			if(!err){
			if(user != null){
				bcrypt.compare(req.body.password, user.password).then(function(result) {
					(result == false)?(res.send({access:false, data: undefined})):(
						res.send({access: true, data:{
							userId:user._id,
							userName:user.name,
							userAge:user.age,
							userRegDate:user.createdAt,
							photo:(!user.photo.name)?({}):({
								name: user.photo.name,
								desc: user.photo.desc,
								img:{
									data: Buffer.from(JSON.parse(JSON.stringify(user.photo.img.data)).data).toString('utf8'),
									contentType: user.photo.img.contentType
								}	
							})
						}})
					)
				});
			}
			else{
				res.send({access:false, data:undefined})
			}   
		}
		})
	} catch (error) {
		console.error(error)
	}
}
	
// Update a user data
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
		Users.findByIdAndUpdate({_id: req.body.data.id},{photo: photo})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving users.",
			});
		});
	}
  };

// delete user
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
