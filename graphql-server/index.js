const { ApolloServer } = require('apollo-server');
const resolvers = require('./queries/resolvers');
const typeDefs = require('./queries/typeDefs');
const port = 5000;

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(port).then(({ url }) => {
	console.log(`Server ready @ ${url}`);
});
