/* ******************** jwt.utils ******************** */

// imports
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../config/.env' });

// constant
const maxAge = 3 * 24 * 60 * 60 * 1000;

// ******************** exports function ******************** //
module.exports = {
	// generateTokenForUser
	generateTokenForUser: function (userData) {
		return jwt.sign(
			{
				userId: userData.id,
				isAdmin: userData.isAdmin,
			},
			process.env.JWT_TOKEN,
			{
				expiresIn: maxAge,
			},
		);
	},
	// generateTokenForUser end

	// parseAuthorization
	parseAuthorization: function (authorization) {
		return authorization != null ? authorization.replace('Bearer ', '') : null;
	},
	// parseAuthorization end

	// getUserId
	getUserId: function (authorization) {
		let userId = -1;
		let token = module.exports.parseAuthorization(authorization);
		if (token != null) {
			try {
				let jwtToken = jwt.verify(token, process.env.JWT_TOKEN);
				if (jwtToken != null) userId = jwtToken.userId;
			} catch (err) {}
		}
		return userId;
	},
	// getUserId end
};
// ******************** exports end ******************** //
