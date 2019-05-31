const expect = require('chai').expect;

let connect = require('../connection/connector').connect;
let disconnect = require('../connection/connector').disconnect;
let connection = require('../connection/connections').test;

let User = require('../models/User');
let userFacade = require('../facade/userFacade');

describe('Testing User Facade', () => {
	before(async () => {
		await connect(connection);
		await User.deleteMany({});
	});

	beforeEach(async () => {
		await User.insertMany([
			{
				firstName: 'Marc',
				lastName: 'A.',
				password: 'pass',
				email: 'marc@mail.com'
			},
			{
				firstName: 'Noah',
				lastName: 'B.',
				password: 'pass',
				email: 'noah@mail.com'
			}
		]);
	});

	afterEach(async () => {
		await User.deleteMany({});
	});

	after(async () => {
		await User.deleteMany({});
		disconnect();
	});

	it('should return a non empty list of users', async () => {
		const users = await userFacade.getAll();
		expect(users).not.to.be.empty;
	});

	it('should return a list of 2 users', async () => {
		const users = await userFacade.getAll();
		expect(users.length).to.be.equal(2);
	});

	it('should return a user from custom id', async () => {
		const users = await userFacade.getAll();
		const user = await userFacade.getByID(users[0]._id);
		expect(users[0].email).to.be.equal(user.email);
	});

	it('should return a user from custom mail', async () => {
		const user = await userFacade.getByEmail('marc@mail.com');
		expect(user.email).to.be.equal('marc@mail.com');
	});

	it('should return a new user', async () => {
		const newUser = await userFacade.add({
			firstName: 'Lars',
			lastName: 'C.',
			email: 'lars@mail.com',
			password: 'pass'
		});
		const user = await userFacade.getByEmail('lars@mail.com');
		expect(String(newUser._id)).to.be.equal(String(user._id));
	});

	it('should return a list of 3 users', async () => {
		await userFacade.add({
			firstName: 'Lars',
			lastName: 'C.',
			email: 'lars@mail.com',
			password: 'pass'
		});
		const users = await userFacade.getAll();
		expect(users.length).to.be.equal(3);
	});

	it('should update user in list', async () => {
		await userFacade.update('marc@mail.com', 'mocha', 'chai');
		const user = await userFacade.getByEmail('marc@mail.com');
		expect(user.firstName).to.be.equal('mocha');
		expect(user.lastName).to.be.equal('chai');
	});

	it('should return a list of 1 users', async () => {
		const user = await userFacade.getByEmail('marc@mail.com');
		await userFacade.remove(user._id);
		const users = await userFacade.getAll();
		expect(users.length).to.be.equal(1);
	});
});
