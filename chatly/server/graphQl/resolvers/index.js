const { Message } = require('../../models');
const messageResolvers = require('./messageResolvers');
const userResolver = require('./userResolver');
const { Op } = require('sequelize');

module.exports = {
	User: {
		latestMessage: async (parent, args, { user }) => {
			const messages = await Message.findAll({
				where: {
					[Op.or]: [
						{ [Op.and]: [{ to: user.username }, { from: parent.username }] },
						{ [Op.and]: [{ from: user.username }, { to: parent.username }] },
					],
				},
				order: [['createdAt', 'DESC']],
			});
			return messages[0];
		},
	},
	Query: {
		...userResolver.Query,
		...messageResolvers.Query,
	},
	Mutation: {
		...userResolver.Mutation,
		...messageResolvers.Mutation,
	},
};
