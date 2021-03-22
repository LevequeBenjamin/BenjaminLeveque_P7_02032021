/* ******************** middleware/auth.middleware ******************** */

// imports
const jwt = require('jsonwebtoken');
const models = require('../models');
require('dotenv').config({ path: '../config/.env' });

//* ******************** checkUser ******************** *//
exports.checkUser = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.JWT_TOKEN, async (err, decodedToken) => {
			if (err) {
				res.locals.user = null;
				res.cookie('jwt', '', { maxAge: 1 });
				next();
			} else {
				let user = await models.User.findByPk(decodedToken.userId);
				res.locals.user = user;
				console.log(res.locals.user);
				next();
			}
		});
	} else {
		res.locals.user = null;
		next();
	}
};
//* ******************** checkUser end ******************** *//

/* ******************** requireAuth ******************** */
exports.requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	console.log(token);
	if (token) {
		jwt.verify(token, process.env.JWT_TOKEN, (err, decodedToken) => {
			if (err) {
				console.log(err);
			} else {
				console.log(decodedToken.userId);
				next();
			}
		});
	} else {
		console.log('no token !');
	}
};
/* ******************** requireAuth end ******************** */
