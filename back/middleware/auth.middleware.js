/* *****Middleware qui protégera les routes sélectionnées et vérifier que l'utilisateur est authentifié avant d'autoriser l'envoi de ses requêtes***** */

// On récupère le package jsonwebtoken
const jwt = require('jsonwebtoken');
const models = require('../models');

// utilisation du package dotenv pour masquer les informations de connexion à la base de données à l'aide de variables d'environnement
require('dotenv').config({ path: '../config/.env' });

//* *****Midlleware auth***** *//
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
//* //////////////////// auth END //////////////////// */

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
