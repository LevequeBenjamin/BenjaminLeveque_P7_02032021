// ******************** comment.controller ******************** //

// imports
const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

/* ******************** commentPost ******************** */
// permet de commenter un post
exports.commentPost = async (req, res) => {
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

		// création du commentaire
		const newComment = await models.Comment.create({
			postId: postId,
			userId: user.id,
			content: req.body.content,
		});

		if (newComment) {
			res.status(201).json({ message: 'le commentaire est créé', newComment });
		} else {
			return res
				.status(401)
				.json({ error: 'désolé, quelque chose à mal tourné' });
		}
		// const postFound = await models.Post.findOne({
		// 	where: { id: postId },
		// });
		// if (postFound) {
		// 	await postFound.update({
		// 		comments: postFound.comments + newComment,
		// 	});
		// } else {
		// 	res.status(400).json({ error: 'cannot fetch user !' });
		// }
	} catch (error) {
		res.status(500).json({ error });
	}
};
/* ******************** commentPost end ******************** */

/* ******************** readCommentPost ******************** */
// permet de voir tous les commentaires
exports.readCommentPost = async (req, res) => {
	try {
		const comments = await models.Comment.findAll({
			getIncludedAssociation: ['user'],
		});
		if (comments > []) {
			res.status(200).send({ message: comments });
		} else {
			return res.status(401).json({ error: "il n'y a pas de commentaires" });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
/* ******************** readCommentPost end ******************** */

exports.deleteCommentPost = async (req, res) => {
	try {
		// authentification de l'utilisateur
		let userId = jwtUtils.getUserId(req.cookies.jwt);

		// on contrôle si l'utilisateur existe dans la bd
		const user = await models.User.findOne({
			where: { id: userId },
		});
		if (!user) {
			return res.status(401).json({ error: 'Utilisateur non trouvé !' });
		}

		// on contrôle que le commentaire existe dans la bd
		const commentFound = await models.Comment.findOne({
			where: { id: req.body.id },
		});

		if (!commentFound) {
			return res.status(401).json({ error: 'Commentaire non trouvé !' });
		}

		// suppression du commentaire
		await models.Comment.destroy({
			where: { id: req.body.id },
		});
		res.status(200).json({ message: 'commentaire supprimé' });
	} catch (error) {
		res.status(500).json({ error });
	}
};
