const { ApolloServer, gql } = require('apollo-server');

const typeDefs = require('./graphQl/typeDefs');
const resolvers = require('./graphQl/resolvers/index');
const { sequelize } = require('./models');
const authContext = require('./context/auth');

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: authContext,
});
server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
	sequelize
		.authenticate()
		.then(() => {
			console.log('Database connected');
		})
		.catch(err => {
			console.error(err);
		});
});
