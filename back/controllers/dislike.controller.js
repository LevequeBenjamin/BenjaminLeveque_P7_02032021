// ******************** dislike.controller ******************** //

// imports
const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

// constants
const DISLIKED = 1;

/* ******************** dislikePost ******************** */
// permet de disliker un post
exports.dislikePost = async (req, res) => {
	try {
		// authentification de l'utilisateur
		let userId = jwtUtils.getUserId(req.cookies.jwt);
		let postId = req.params.id;

		// on contrôle si l'utilisateur existe dans la bd
		const user = await models.User.findOne({
			where: { id: userId },
		});
		if (!user) {
			return res.status(401).json({ error: 'Utilisateur non trouvé !' });
		}

		// on contrôle si l'utilisateur à déjà liké le post
		const likerId = await models.Like.findOne({
			where: {
				userId: userId,
				postId: postId,
			},
		});

		if (likerId) {
			return res
				.status(401)
				.json({ error: 'Cet utilisateur a déjà liké ce post' });
		}

		// on contrôle si l'utilisateur à déjà disliké le post
		const disLikerId = await models.DisLike.findOne({
			where: {
				userId: userId,
				postId: postId,
			},
		});

		if (disLikerId) {
			return res
				.status(401)
				.json({ error: 'Cet utilisateur a déjà disliké ce post' });
		}

		// création du dislike
		await models.DisLike.create({
			postId: postId,
			userId: user.id,
			isDisLike: DISLIKED,
		})
			.then(res.status(200).json({ message: 'post disliké' }))
			.catch(error => res.status(500).json({ error }));
		const postFound = await models.Post.findOne({
			where: { id: postId },
		});
		if (postFound) {
			// on met à jour le nombre de dislike dans le post
			await postFound.update({
				disLikes: postFound.disLikes + 1,
			});
		} else {
			res.status(400).json({ error: 'impossible de récupérer le post' });
		}
	} catch (error) {
		res.status(500).json({ error });
	}
};
/* ******************** dislikePost end ******************** */

/* ******************** deleteDislike ******************** */
// permet d'annuler un dislike
exports.deleteDisLike = async (req, res) => {
	try {
		// authentification de l'utilisateur
		let userId = jwtUtils.getUserId(req.cookies.jwt);
		let postId = req.params.id;

		// on contrôle si l'utilisateur existe dans la bd
		const user = await models.User.findOne({
			where: { id: userId },
		});
		if (!user) {
			return res.status(401).json({ error: 'Utilisateur non trouvé !' });
		}

		// on supprime le dislike
		await models.DisLike.destroy({
			where: { userId: userId },
		})
			.then(res.status(200).json({ message: 'dislike supprimé' }))
			.catch(error => res.status(500).json({ error }));
		const postFound = await models.Post.findOne({
			where: { id: postId },
		});
		if (postFound) {
			// on met à jour le nombre de dislike dans le post
			await postFound.update({
				dislikes: postFound.dislikes - 1,
			});
		} else {
			res.status(400).json({ error: 'impossible de récupérer le post' });
		}
	} catch (error) {
		res.status(500).json({ error });
	}
};
/* ******************** deleteDislike end ******************** */
