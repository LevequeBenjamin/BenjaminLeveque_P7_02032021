// ******************** like.controller ******************** //

// imports
const models = require('../models');

/* ******************** likePost ******************** */
// permet de liker un post
exports.likePost = async (req, res) => {
	try {
		let userId = req.params.liker;
		let postId = req.params.id;

		// création du like
		await models.Like.create({
			postId: postId,
			userId: userId,
		})
			.then(like => res.status(201).send({ like }))
			.catch(error => res.status(400).send({ error }));
	} catch (error) {
		res.status(500).send({ error });
	}
};
/* ******************** likePost end ******************** */

/* ******************** deleteLike ******************** */
// permet d'annuler un like
exports.deleteLike = async (req, res) => {
	try {
		let userId = req.params.liker;
		let postId = req.params.id;

		// on supprime le dislike
		await models.Like.destroy({
			where: { userId: userId, postId: postId },
		})
			.then(res.status(200).send({ message: 'le like est supprimé' }))
			.catch(error => res.status(400).send({ error }));
	} catch (error) {
		res.status(500).send({ error });
	}
};
/* ******************** deleteLike end ******************** */

/* ******************** readLikePost ******************** */
// permet de voir tous les commentaires
exports.readLikePost = async (req, res) => {
	try {
		const likes = await models.Like.findAll({
			attributes: ['id', 'userId', 'postId'],
		});
		if (likes > []) {
			res.status(200).send(likes);
		} else {
			res.status(400).send({ error: "il n'y a pas de likes" });
		}
	} catch (error) {
		res.status(500).send({ error });
	}
};
/* ******************** readLikePost end ******************** */
