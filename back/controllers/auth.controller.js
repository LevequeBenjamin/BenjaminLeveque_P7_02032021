// ******************** auth.controller ******************** //

// imports
const models = require('../models');
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const verifyInput = require('../middleware/verifyInput');
const { signUpErrors } = require('../utils/errors.utils');
require('dotenv').config({ path: '../config/.env' });

// constants
const maxAge = 3 * 24 * 60 * 60 * 1000;

/* ******************** signup ******************** */
// permet de créer un utilisateur
exports.signUp = async (req, res) => {
	const { email, username, password, bio } = req.body;

	// on contrôle que tous les champs soit rempli
	//if (email == null || username == null || password == null) {
		//return res.status(400).json({ error: 'paramètres manquants !' });
	//}

	// on valide les champs
	let emailTrue = verifyInput.validEmail(email);
	let passwordTrue = verifyInput.validPassword(password);
	let usernameTrue = verifyInput.validUsername(username);

	if (usernameTrue == false) {
		 res.status(200).json({
			errorUsername:
				'username non valid ! (Il doit contenir entre 3 et 36 caractères et ne pas contenir de caractères spécial)',
		});
	}

	if (emailTrue == false) {
		 res.status(200).json({ errorEmail: 'email non valide !' });
	}

	if (passwordTrue == false) {
		 res.status(200).json({
			errorPassword:
				'password non valide !(Il doit contenir entre 8 et 42 caractères, au moins un chiffre, une majuscule, une minuscule et un caractère spécial !',
		});
	}

	// hash le password
	bcrypt.hash(password, 10).then(async function (hash) {
		try {
			// on crée l'utilisateur
			const user = await models.User.create({
				email,
				username,
				password: hash,
				bio,
				isAdmin: 0,
			});
			res.status(201).json({ user: user.id });
		} catch (err) {
			const errors = signUpErrors(err);
			res.status(200).send({ errors });
		}
	});
};
/* ******************** signup end ******************** */

/* ******************** login ******************** */
// permet de loger un utilisateur
exports.login = async (req, res) => {
	const { email, password } = req.body;

	// on contrôle que tous les champs soit rempli
	if (email == null || password == null) {
		 res.status(200).json({ error: 'paramètres manquants' });
	}
	try {
		// on contrôle si l'email existe dans la bd
		const user = await models.User.findOne({ where: { email: email } });
		if (!user) {
			res.status(200).json({ errorEmail: 'Email inconnu' });
		}
		await bcrypt
			// on compare le password
			.compare(password, user.password)
			.then(valid => {
				if (!valid) {
					 res
						.status(200)
						.json({ errorPassword: 'Le mot de passe ne correspond pas' });
				}
				// on crée un token est on le passe dans le cookie
				const token = jwtUtils.generateTokenForUser(user);
				res.cookie('jwt', token, { httpOnly: true, maxAge });
				res.status(200).json({
					id: user.id,
				});
			})
			.catch(error => res.status(500).json({ error }));
	} catch (error) {
		res.status(500).json({ error });
	}
};
/* ******************** login end ******************** */

/* ******************** logout ******************** */
// permet à l'utilisateur de se logout
exports.logout = (req, res) => {
	res.cookie('jwt', '', { maxAge: 1 });
	res.redirect('/');
};
/* ******************** logout end ******************** */
