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
			res.status(201).json(user);
		} else {
			res.status(404).json({ error: 'user ' + req.params.id + ' not found !' });
		}
	} catch (error) {
		res.status(500).json({ error: 'cannot fetch user !' });
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
			res.status(201).json(user);
		} else {
			res.status(404).json({ error: 'users not found !' });
		}
	} catch (error) {
		res.status(500).json({ error: 'cannot fetch user !' });
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
		if (!user) {
			return res.status(401).json({ error: 'Utilisateur non trouvé !' });
		}
		await user
			.update({
				bio: req.body.bio,
			})
			.then(res.status(201).json({ message: 'bio modifié !' }))
			.catch(err => res.status(500).json(err));
	} catch (err) {
		res.status(500).json({ err });
	}
};
/* ******************** updateUser end ******************** */

/* ******************** deleteUser ******************** */
// permet de supprimer un utilisateur
exports.deleteUser = async (req, res) => {
	try {
		const user = await models.User.findOne({
			where: { id: req.params.id },
		});
		if (!user) {
			return res.status(401).json({ error: 'Utilisateur non trouvé !' });
		}
		await models.User.destroy({ where: { id: req.params.id } })
			.then(user =>
				res
					.status(200)
					.json({ message: 'user ' + req.params.id + ' supprimé !' }),
			)
			.catch(error => res.status(500).json({ error }));
	} catch (error) {
		res.status(500).json({ error });
	}
};
/* ******************** deleteUser end ******************** */
