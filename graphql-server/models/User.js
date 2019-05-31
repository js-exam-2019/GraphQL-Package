const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	created: { type: Date, default: Date.now },
	lastUpdated: { type: Date }
});

UserSchema.pre('save', function(next) {
	//this.password = 'encrypted, ' + this.password;
	console.log('password should be encrypted with hash and salt!');
	next();
});

UserSchema.pre('findOneAndUpdate', function(next) {
	this.update({}, { $set: { lastUpdated: new Date() } });
	next();
});

module.exports = mongoose.model('User', UserSchema);
