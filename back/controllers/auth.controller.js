const models = require('../models');
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const verifyInput = require('../middleware/verifyInput');
const {signUpErrors} = require('../utils/errors.utils');
require('dotenv').config({ path: '../config/.env' });

const maxAge = 1 * 24 * 60 * 60 * 1000;

exports.signUp = async (req, res) => {
	const { email, username, password, bio } = req.body;
	console.log(req.body);

	if (email == null || username == null || password == null) {
		return res.status(400).json({ error: 'paramètres manquants !' });
	}

	// verify Input
	let emailTrue = verifyInput.validEmail(email);
	let passwordTrue = verifyInput.validPassword(password);
	let usernameTrue = verifyInput.validUsername(username);

	if (usernameTrue == false) {
		return res.status(400).json({
			error:
				'username non valid ! (Il doit contenir entre 3 et 36 caractères et ne pas contenir de caractères spécial)',
		});
	}

	if (emailTrue == false) {
		return res.status(400).json({ error: 'email non valide !' });
	}

	if (passwordTrue == false) {
		return res.status(400).json({
			error:
				'password non valide !(Il doit contenir entre 8 et 42 caractères, au moins un chiffre, une majuscule, une minuscule et un caractère spécial !',
		});
	}

	bcrypt.hash(password, 10).then(async function (hash) {
		// Store hash in your password DB.
		try {
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

exports.login = (req, res) => {
	const { email, password } = req.body;

	if (email == null || password == null) {
		return res.status(400).json({ error: 'paramètres manquants' });
	}

	models.User.findOne({ where: { email: email } })
		.then(user => {
			if (!user) {
				return res.status(401).json({ error: 'Email inconnu' });
			}
			bcrypt
				.compare(password, user.password)
				.then(valid => {
					if (!valid) {
						return res.status(401).json({ error: 'Le mot de passe ne correspond pas' });
					}
					const token = jwtUtils.generateTokenForUser(user);
					res.cookie('jwt', token, { httpOnly: true, maxAge});
					res.status(200).json({
						id: user.id,
					});
				})
				.catch(error => res.status(500).json({ error }));
		})
		.catch(error => res.status(500).json({ error }));
};

exports.logout = (req, res) => {
	res.cookie('jwt', '', { maxAge: 1});
	res.redirect('/');
};



