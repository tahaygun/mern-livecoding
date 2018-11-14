const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

var UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		required: true,
		default: new Date().toISOString()
	}
});

UserSchema.methods.hashPassword = function(password) {
	return bcrypt.hashSync(password, 12);
  };
  UserSchema.methods.comparePassword = function(password, hashedPassword) {
	return bcrypt.compareSync(password, hashedPassword);
  };

module.exports = mongoose.model('User', UserSchema);
