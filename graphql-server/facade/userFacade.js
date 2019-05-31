let User = require('../models/User');

// CRUD:: Read
const getAll = async () => await User.find({}).exec();
const getByID = async (_id) => await User.findById({ _id }).exec();
const getByEmail = async (email) => await User.findOne({ email }).exec();

// CRUD:: Create
const add = async ({ firstName, lastName, email, password }) => {
	return await new User({ firstName, lastName, email, password }).save();
};

// CRUD:: Update
const update = async (email, firstName, lastName) => {
	return await User.findOneAndUpdate({ email }, { firstName, lastName }, { new: true });
};

// CRUD:: Delete
const remove = async (_id) => {
	return await User.findByIdAndRemove({ _id }).exec();
};

module.exports = { getAll, getByID, getByEmail, add, update, remove };
