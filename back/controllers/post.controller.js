// ******************** post.controller ******************** //

// imports
const models = require('../models');
const { uploadErrors } = require('../utils/errors.utils');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

/* ******************** createPost ******************** */
exports.createPost = async (req, res) => {
	let content = req.body.content;
	let userId = req.body.userId;
	let filename;

	if (req.file != null) {
		try {
			if (
				req.file.detectedMimeType !== 'image/jpg' &&
				req.file.detectedMimeType !== 'image/png' &&
				req.file.detectedMimeType !== 'image/jpeg'
			)
				throw Error('invalid file');

			if (req.file.size > 500000) throw Error('max size');
		} catch (err) {
			const errors = uploadErrors(err);
			return res.status(201).send({errors});
		}

		filename = userId + Date.now() + '.jpg';

		await pipeline(
			req.file.stream,
			fs.createWriteStream(
				`${__dirname}/../client/public/uploads/posts/${filename}`,
			),
		);
	}

	try {
		await models.Post.create({
			content: content,
			imageUrl: req.file != null ? './uploads/posts/' + filename : '',
			UserId: userId,
			video: req.body.video,
		})
			.then(newPost => res.status(201).send({ newPost }))
			.catch(error => res.status(400).send({ error }));
	} catch (error) {
		return res.status(500).send({ error });
	}
};
/* ******************** createPost end ******************** */

/* ******************** readPost ******************** */
exports.readPost = async (req, res) => {
	try {
		const posts = await models.Post.findAll({
			order:[['createdAt', 'DESC']],
			include: [
				{
					model: models.User,
					attributes: ['username'],
				},
			],
			
		});
		if (posts) {
			res.status(200).send(posts);
		} else {
			res.status(404).send({ error: 'aucun message trouvé' });
		}
	} catch (error) {
		res.status(500).send({ error });
	}
};
/* ******************** readPost end ******************** */

/* ******************** readOnePost ******************** */
exports.readOnePost = async (req, res) => {
	let postId = req.params.id
	try {
		const post = await models.Post.findOne({
			include: [
				{
					model: models.User,
					attributes: ['username'],
				},
			],
			where: {id: postId}
		});
		if (post) {
			res.status(200).send(post);
		} else {
			res.status(404).send({ error: 'aucun message trouvé' });
		}
	} catch (error) {
		res.status(500).send({ error });
	}
};
/* ******************** readOnePost end ******************** */

/* ******************** updatePost ******************** */
exports.updatePost = async (req, res) => {
	let content = req.body.content;

	try {
		const post = await models.Post.findOne({
			where: { id: req.params.id },
		});

		await post
			.update({
				content: content,
			})
			.then(post => res.status(200).send({ post }))
			.catch(error => res.status(400).send({ error }));
	} catch (error) {
		res.status(500).send({ error });
	}
};
/* ******************** updatePost end ******************** */

/* ******************** deletePost ******************** */
exports.deletePost = async (req, res) => {
	try {
		await models.Post.destroy({
			where: { id: req.params.id },
		})
			.then(
				res
					.status(200)
					.send({ message: 'post ' + req.params.id + ' supprimé !' }),
			)
			.catch(error => res.status(400).send({ error }));
	} catch (error) {
		res.status(500).send({ error });
	}
};
/* ******************** deletePost end ******************** */

// exports.createPost = async (req, res) => {
// 	let content = req.body.content;
// 	let userId = req.body.userId;
// 	let filename;

// 	if (req.file != null) {
// 		try {
// 			if (
// 				req.file.detectedMimeType !== 'image/jpg' &&
// 				req.file.detectedMimeType !== 'image/png' &&
// 				req.file.detectedMimeType !== 'image/jpeg'
// 			)
// 				throw Error('invalid file');

// 			if (req.file.size > 500000) throw Error('max size');

// 			filename = userId + Date.now() + '.jpg';

// 			await pipeline(
// 				req.file.stream,
// 				fs.createWriteStream(
// 					`${__dirname}/../client/public/uploads/posts/${filename}`,
// 				),
// 			);

// 			await models.Post.create({
// 				content: content,
// 				imageUrl: req.file != null ? './uploads/posts/' + filename : '',
// 				UserId: userId,
// 				video: req.body.video,
// 			})
// 				.then(newPost => res.status(201).send({ newPost }))
// 				.catch(error => res.status(400).send({ error }));
// 		} catch (err) {
// 			const errors = uploadErrors(err);
// 		 res.status(200).send({errors});
// 		}
// 	}
// };

// exports.createPost = async (req, res) => {
// 	let fileName;
// 	let content = req.body.content;
// 	let userId = req.body.userId;

// 	if (req.file !== null) {
// 		try {
// 			if (
// 				req.file.detectedMimeType != 'image/jpg' &&
// 				req.file.detectedMimeType != 'image/png' &&
// 				req.file.detectedMimeType != 'image/jpeg'
// 			)
// 				throw Error('invalid file');

// 			if (req.file.size > 500000) throw Error('max size');
// 		} catch (err) {
// 			const errors = uploadErrors(err);
// 			return res.status(201).json({ errors });
// 		}
// 		fileName = userId + Date.now() + '.jpg';

// 		await pipeline(
// 			req.file.stream,
// 			fs.createWriteStream(
// 				`${__dirname}/../client/public/uploads/posts/${fileName}`,
// 			),
// 		);
// 	}

// 	try {
// 		await models.Post.create({
// 			content: content,
// 			imageUrl: req.file != null ? './uploads/posts/' + filename : '',
// 			UserId: userId,
// 			video: req.body.video,
// 		});
// 		return newPost => res.status(201).json(newPost);
// 	} catch (err) {
// 		return res.status(400).send(err);
// 	}
// };
