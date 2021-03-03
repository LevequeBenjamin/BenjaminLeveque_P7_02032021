const models = require('../models');

exports.getUser = (req, res) => {

	models.User.findOne({
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
	})
		.then(user => {
			if (user) {
				res.status(201).json(user);
			} else {
				res
					.status(404)
					.json({ error: 'user ' + req.params.id + ' not found !' });
			}
		})
		.catch(error => {
			res.status(500).json({ error: 'cannot fetch user !' });
		});
};

exports.getAllUsers = (req, res) => {
	models.User.findAll({
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
	})
		.then(user => {
			if (user) {
				res.status(201).json(user);
			} else {
				res.status(404).json({ error: 'users not found !' });
			}
		})
		.catch(error => {
			res.status(500).json({ error: 'cannot fetch user !' });
		});
};

exports.updateUser = (req, res) => {
	//Getting auth header
	//let headerAuth = req.headers['authorization'];
	//let userId = jwtUtils.getUserId(headerAuth);

	//if (userId < 0) return res.status(400).json({ error: 'wrong token !' });

	models.User.findOne({
		attributes: ['bio'],
		where: { id: req.params.id },
	})
		.then(user => {
			if (!user) {
				return res.status(401).json({ error: 'Utilisateur non trouvé !' });
			}
			models.User.update(
				{
					bio: req.body.bio,
				},
				{ where: { id: req.params.id } },
			)
				.then(user => res.status(200).status({ message: 'bio modifié !' }))
				.catch(err => res.status(500).json(err));
		})
		.catch(error => {
			res.status(500).json({ message: err });
		});
};

exports.deleteUser = (req, res) => {
	//Getting auth header
	//let headerAuth = req.headers['authorization'];
	//let userId = jwtUtils.getUserId(headerAuth);

	//if (userId < 0) return res.status(400).json({ error: 'wrong token !' });
	models.User.findOne({
		where: { id: req.params.id },
	})
		.then(user => {
			if (!user) {
				return res.status(401).json({ error: 'Utilisateur non trouvé !' });
			}
			models.User.destroy({ where: { id: req.params.id } })
				.then(user =>
					res
						.status(200)
						.json({ message: 'user ' + req.params.id + ' supprimé !' }),
				)
				.catch(error => res.status(500).json({ error }));
		})
		.catch(error => {
			res.status(500).json({ error });
		});
};
