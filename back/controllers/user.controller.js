// ******************** user.controller ******************** //

// imports
const models = require('../models');

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
	try {
		await models.User.destroy({ where: { id: req.params.id } })
			.then(
				res
					.status(200)
					.send({ message: 'user ' + req.params.id + ' supprimé !' }),
			)
			.catch(error => res.status(400).send({ error }));
	} catch (error) {
		res.status(500).send({ error });
	}
};
/* ******************** deleteUser end ******************** */
