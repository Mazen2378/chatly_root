const { gql } = require('apollo-server');
module.exports = gql`
	type User {
		username: String!
		email: String!
		imageURL: String
		token: String
		latestMessage: Message
	}
	type Message {
		content: String!
		to: String!
		from: String!
		uuid: String!
	}
	type Query {
		users: [User]!
		nlusers: [User]!
		user(username: String!): User!
		retrieveMessages: [Message]!
		retrieveUserMessages(otherUserName: String!): [Message]!
	}
	type Mutation {
		login(username: String!, password: String!): User!
		register(username: String!, email: String!, password: String!): User!
		sendMessage(to: String!, content: String!): Message!
	}
`;
