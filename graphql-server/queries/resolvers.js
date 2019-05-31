let connect = require('../connection/connector').connect;
let disconnect = require('../connection/connector').disconnect;
let connection = require('../connection/connections').dev;
let userFacade = require('../facade/userFacade');

connect(connection);

module.exports = {
	Query: {
		users: async () => {
			return await userFacade.getAll();
		},

		userByID: async (_, { _id }) => {
			return await userFacade.getByID(_id);
		},

		userByEmail: async (_, { email }) => {
			return await userFacade.getByEmail(email);
		}
	},

	Mutation: {
		userAdd: async (_, { input }) => {
			return userFacade.add({
				firstName: input.firstName,
				lastName: input.lastName,
				email: input.email,
				password: input.password
			});
		},

		userUpdate: async (_, { email, firstName, lastName }) => {
			return await userFacade.update(email, firstName, lastName);
		},

		userDelete: async (_, { _id }) => {
			return await userFacade.remove(_id);
		}
	}
};
