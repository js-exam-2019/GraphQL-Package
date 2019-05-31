let connect = require('./connection/connector').connect;
let disconnect = require('./connection/connector').disconnect;
let connection = require('./connection/connections').dev;
let User = require('./models/User');

!(async () => {
	await connect(connection);
	await User.deleteMany({});

	await User.insertMany([
		{
			firstName: 'Stan',
			lastName: 'Marsh',
			password: 'pass',
			email: 'stan@mail.com'
		},
		{
			firstName: 'Kyle',
			lastName: 'Broflovski',
			password: 'pass',
			email: 'kyle@mail.com'
		},
		{
			firstName: 'Eric',
			lastName: 'Cartman',
			password: 'pass',
			email: 'eric@mail.com'
		},
		{
			firstName: 'Kenny',
			lastName: 'McCormick',
			password: 'pass',
			email: 'kenny@mail.com'
		},
		{
			firstName: 'Tweek',
			lastName: 'Tweak',
			password: 'pass',
			email: 'tweek@mail.com'
		},
		{
			firstName: 'Randy',
			lastName: 'Marsh',
			password: 'pass',
			email: 'randy@mail.com'
		},
		{
			firstName: 'Jimbo',
			lastName: 'Kern',
			password: 'pass',
			email: 'jimbo@mail.com'
		},
		{
			firstName: 'PC',
			lastName: 'Principal',
			password: 'pass',
			email: 'pc@mail.com'
		},
		{
			firstName: 'Officer',
			lastName: 'Barbrady',
			password: 'pass',
			email: 'officer@mail.com'
		},
		{
			firstName: 'Mr.',
			lastName: 'Hankey',
			password: 'pass',
			email: 'hankey@mail.com'
		}
	]);

	await disconnect();
})();
