// ******************** comment.controller ******************** //

// imports
const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');

/* ******************** commentPost ******************** */
// permet de commenter un post
exports.commentPost = async (req, res) => {
	try{
	let userId = req.params.userId;
	let postId = req.params.id;
	let commenterId = req.body.commenterId;
	let content = req.body.content;
	
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
			userId: userId,
			commenterId: commenterId,
			content: content,
		});

		if (newComment) {
			res.status(200).json({ newComment });
		} else {
			res.status(401).json({ error: 'désolé, quelque chose à mal tourné' });
		}
		//  const postFound = await models.Post.findOne({
		//  	where: { id: postId },
		//  });
		//  if (postFound) {
		//  	await postFound.update({
		// 		comments: postFound.comments +1,
		//  	});
		//  } else {
		//  	res.status(400).json({ error: 'cannot fetch user !' });
		//  }
	} catch (message) {
		res.status(200).send({ message: "T'es vraiment pas loin!!" });
	}
};
/* ******************** commentPost end ******************** */

/* ******************** updatePost ******************** */
// permet de commenter un post
exports.updatePost = async (req, res) => {
	try{
	//let userId = req.params.userId;
	let content = req.body.content;
	let commentId = req.params.id;
		// // on contrôle si l'utilisateur existe dans la bd
		// const user = await models.User.findOne({
		// 	where: { id: userId },
		// });
		// if (!user) {
		// 	return res.status(401).json({ error: 'Utilisateur non trouvé !' });
		// }
		const commentFound = await models.Comment.findOne({
			 	where: { id: commentId },
			  });

		// création du commentaire
		await commentFound.update({
			content: content,
		})
		.then(comment => res.status(200).json({ comment }))
		.catch(error => res.status(500).json({ error }));
		
	} catch (message) {
		res.status(200).send({ message: "T'es vraiment pas loin!!" });
	}
};
/* ******************** updateCommentPost end ******************** */

/* ******************** readCommentPost ******************** */
// permet de voir tous les commentaires
exports.readCommentPost = async (req, res) => {
	try {
		const comments = await models.Comment.findAll({
			attributes: ['id', 'userId', 'postId', 'commenterId', 'content', 'createdAt', 'updatedAt']
		});
		if (comments > []) {
			res.status(200).json(comments);
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
		let userId = req.params.userId;
		let commentId = req.params.id

		// on contrôle si l'utilisateur existe dans la bd
		const user = await models.User.findOne({
			where: { id: userId },
		});
		if (!user) {
			return res.status(401).json({ error: 'Utilisateur non trouvé !' });
		}

		// on contrôle que le commentaire existe dans la bd
		const commentFound = await models.Comment.findOne({
			where: { id: commentId },
		});

		if (!commentFound) {
			return res.status(401).json({ error: 'Commentaire non trouvé !' });
		}

		// suppression du commentaire
		await models.Comment.destroy({
			where: { id: commentId },
		});
		// const postFound = await models.Post.findOne({
		// 	where: { id: postId },
		// });
		// if (postFound) {
		// 	await postFound.update({
		// 		comments: postFound.comments - 1,
		// 	});
		// } else {
		// 	res.status(400).json({ error: 'cannot fetch user !' });
		// }
		res.status(200).json({ message: 'commentaire supprimé' });
	} catch (error) {
		res.status(500).json({ error });
	}
};
