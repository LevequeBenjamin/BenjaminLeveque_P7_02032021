// ******************** dislike.controller ******************** //

// imports
const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

// constants
//const LIKED = 1;

/* ******************** likePost ******************** */
// permet de liker un post
exports.likePost = async (req, res) => {
	try {
		// authentification de l'utilisateur
		let userId = jwtUtils.getUserId(req.cookies.jwt);
		let postId = req.params.id;

		// on contrôle si l'utilisateur existe dans la bd
		const user = await models.User.findOne({
			where: { id: userId },
		});
		if (!user) {
			 res.status(200).json({ error: 'Utilisateur non trouvé !' });
		}

		// on contrôle si l'utilisateur à déjà liké le post
		const likerId = await models.Like.findOne({
			where: {
				userId: userId,
				postId: postId,
			},
		});

		if (likerId) {
			 res
				.status(200)
				.json({ error: 'Cet utilisateur a déjà liké ce post' });
		}

		// // on contrôle si l'utilisateur à déjà disliké le post
		// const dislikerId = await models.DisLike.findOne({
		// 	where: {
		// 		userId: userId,
		// 		postId: postId,
		// 	},
		// });

		// if (dislikerId) {
		// 	 res
		// 		.status(200)
		// 		.json({ error: 'Cet utilisateur a déjà disliké ce post' });
		// }

		// création du like
		await models.Like.create({
			postId: postId,
			userId: user.id,
			//isLike: LIKED,
		})
			.then(res.status(200).json({ message: 'post liké' }))
			.catch(error => res.status(200).json({ error }));
		const postFound = await models.Post.findOne({
			where: { id: postId },
		});
		if (postFound) {
			// on met à jour le nombre de like dans le post
			await postFound.update({
				likes: postFound.likes + 1,
			});
		} else {
			res.status(200).json({ error: 'impossible de récupérer le post' });
		}
	} catch (error) {
		res.status(200).json({ error });
	}
};
/* ******************** likePost end ******************** */

/* ******************** deleteLike ******************** */
// permet d'annuler un like
exports.deleteLike = async (req, res) => {
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
		await models.Like.destroy({
			where: { userId: userId },
		})
			.then(res.status(200).json({ message: 'le like est supprimé' }))
			.catch(error => res.status(500).json({ error }));
		const postFound = await models.Post.findOne({
			where: { id: postId },
		});
		if (postFound) {
			// on met à jour le nombre de dislike dans le post
			await postFound.update({
				likes: postFound.likes - 1,
			});
		} else {
			res.status(400).json({ error: 'impossible de récupérer le post' });
		}
	} catch (error) {
		res.status(500).json({ error });
	}
};
/* ******************** deleteLike end ******************** */

/* ******************** readCommentPost ******************** */
// permet de voir tous les commentaires
exports.readLikePost = async (req, res) => {
	try {
		const likes = await models.Like.findAll({
			getIncludedAssociation: ['user'],
		});
		if (likes > []) {
			res.status(200).json(likes);
		} else {
			return res.status(401).json({ error: "il n'y a pas de likes" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
/* ******************** readCommentPost end ******************** */