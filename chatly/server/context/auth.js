const jwt = require('jsonwebtoken');

const authContext = ctx => {
	const token = ctx.req.headers.authorization || null;
	try {
		if (token) {
			const decodedToken = jwt.verify(token, 'Aymmzn');
			console.log('hi');
			ctx.user = decodedToken;
		}
	} catch (err) {
		console.log(err);
	}
	return ctx;
};
module.exports = authContext;
