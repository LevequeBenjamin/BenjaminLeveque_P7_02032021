// ******************** controllers/user.controller.js ******************** //

// imports
const models = require('../models');
const bcrypt = require('bcrypt');

/* ******************** getUser ******************** */
// permet de récuperer un utilisateur dans la bd
exports.getUser = async (req, res) => {
	try {
		const user = await models.User.findOne({
			attributes: [
				'id',
				'email',
				'username',
				'bio',
				'pictureUrl',
				'isAdmin',
				'createdAt',
				'updatedAt',
			],
			where: { id: req.params.id },
		});

		if (user) {
			res.status(200).send(user);
		} else {
			res.status(404).send({ error: 'user ' + req.params.id + ' not found !' });
		}
	} catch (error) {
		res.status(500).send({ error });
	}
};
/* ******************** getUser end ******************** */

/* ******************** getAllUsers ******************** */
// permet de récupérer tous les utilisateurs dans la bd
exports.getAllUsers = async (req, res) => {
	try {
		const user = await models.User.findAll({
			attributes: [
				'id',
				'email',
				'username',
				'bio',
				'pictureUrl',
				'isAdmin',
				'createdAt',
				'updatedAt',
			],
		});
		if (user) {
			res.status(200).send(user);
		} else {
			res.status(404).send({ error: 'users not found !' });
		}
	} catch (error) {
		res.status(500).send({ error });
	}
};
/* ******************** getAllUsers end ******************** */

/* ******************** updateUser ******************** */
// permet de modifier un utilisateur
exports.updateUser = async (req, res) => {
	try {
		const user = await models.User.findOne({
			attributes: ['bio', 'id'],
			where: { id: req.params.id },
		});
		await user
			.update({
				bio: req.body.bio,
			})
			.then(res.status(200).send({ message: 'bio modifié !' }))
			.catch(error => res.status(400).send(error));
	} catch (error) {
		res.status(500).send({ error });
	}
};
/* ******************** updateUser end ******************** */

/* ******************** deleteUser ******************** */
// permet de supprimer un utilisateur
exports.deleteUser = async (req, res) => {
	const password = req.body.password;

	try {
		// on contrôle si l'email existe dans la bd
		const user = await models.User.findOne({ where: { id: req.params.id } });
		if (!user) {
			res.status(200).send({ errorEmail: 'id inconnu' });
		}
		await bcrypt
			// on compare le password
			.compare(password, user.password)
			.then(valid => {
				if (!valid) {
					res
						.status(200)
						.json({ errorPassword: 'Le mot de passe ne correspond pas' });
				} else {
					try {
						user
							.destroy()
							.then(
								res
									.status(200)
									.send({ message: 'user ' + req.params.id + ' supprimé !' }),
							)
							.catch(error => res.status(400).send({ error }));
					} catch (err) {
						res.status(500).send({ err });
					}
				}
			})
			.catch(error => res.status(500).send({ error }));
	} catch (error) {
		res.status(500).send({ error });
	}
};
/* ******************** deleteUser end ******************** */
