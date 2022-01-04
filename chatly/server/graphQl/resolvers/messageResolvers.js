const { AuthenticationError, UserInputError } = require('apollo-server');
const { Message, User } = require('../../models');
const { Op } = require('sequelize');

module.exports = {
	Query: {
		retrieveMessages: async (parent, args, { user }) => {
			try {
				if (!user) throw new AuthenticationError('unauthanticated');
				const messages = await Message.findAll({
					where: {
						[Op.or]: [{ to: user.username }, { from: user.username }],
					},
				});
				return messages;
			} catch (err) {
				console.log(err);
				throw err;
			}
		},
		retrieveUserMessages: async (parent, { otherUserName }, { user }) => {
			try {
				if (!user) throw new AuthenticationError('unauthanticated');
				const otherUser = await User.findOne({
					where: {
						username: otherUserName,
					},
				});
				if (!otherUser)
					throw new UserInputError(
						"can't find the user you are trying to message"
					);
				const messages = await Message.findAll({
					where: {
						[Op.or]: [
							{ [Op.and]: [{ to: user.username }, { from: otherUserName }] },
							{ [Op.and]: [{ from: user.username }, { to: otherUserName }] },
						],
					},
					order: [['createdAt', 'DESC']],
				});
				console.log(messages);
				return messages;
			} catch (err) {
				console.log(err);
				throw err;
			}
		},
	},
	Mutation: {
		sendMessage: async (parent, { content, to }, { user }) => {
			try {
				if (!user) throw new AuthenticationError('unauthaniticated');
				if (content.trim() === '')
					throw new UserInputError("the message can't be empty");
				const otherUser = await User.findOne({
					where: {
						username: to,
					},
				});
				if (!otherUser) throw new UserInputError('user not found');
				const message = await Message.create({
					to,
					from: user.username,
					content,
				});
				return message;
			} catch (err) {
				throw err;
				console.log(err);
			}
		},
	},
};
