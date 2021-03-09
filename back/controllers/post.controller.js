// imports
const models = require('../models');
const { uploadErrors } = require('../utils/errors.utils');
const jwtUtils = require('../utils/jwt.utils');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

exports.createPost = async (req, res) => {
	//Params
	let title = req.body.title;
	let content = req.body.content;
	let userId = jwtUtils.getUserId(req.cookies.jwt);
	let filename;

	if (req.file !== null) {
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
			return res.status(201).json(errors);
		}

		filename = userId + Date.now() + '.jpg';

		await pipeline(
			req.file.stream,
			fs.createWriteStream(
				`${__dirname}/../client/public/uploads/posts/${filename}`,
			),
		);
	}

	if (title == null || content == null) {
		return res.status(400).json({ error: 'paramètres manquants' });
	}
	try {
		const user = await models.User.findOne({
			where: { id: userId },
		});
		if (!user) {
			return res.status(401).json({ error: 'Utilisateur non trouvé !' });
		}
		const newPost = await models.Post.create({
			title: title,
			content: content,
			imageUrl: req.file !== null ? './uploads/posts/' + filename : '',
			UserId: userId,
		})
			.then(newPost => res.status(200).json({ newPost }))
			.catch(error => res.status(500).json({ error }));
	} catch (error) {
		res.status(500).json({ error });
	}
};

exports.readPost = async (req, res) => {
	try {
		const posts = await models.Post.findAll({
			include: [
				{
					model: models.User,
					attributes: ['username'],
				},
			],
		});
		if (posts) {
			res.status(200).json(posts);
		} else {
			res.status(404).json({ error: 'no messages found !' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: 'invalid fields !' });
	}
};

exports.updatePost = async (req, res) => {
	//Params
	let content = req.body.content;

	if (content == null) {
		return res.status(400).json({ error: 'paramètres manquants' });
	}
	try {
		const post = await models.Post.findOne({
			where: { id: req.params.id },
		});
		if (!post) {
			return res.status(401).json({ error: 'Post non trouvé !' });
		}
		//(post.content = content),
		//await post
		//	.save({
		//fields: ['content'],
		//})
		await post
			.update({
				content: content,
			})
			.then(post => res.status(200).json({ post }))
			.catch(error => res.status(500).json({ error }));
	} catch (error) {
		res.status(500).json({ error });
	}
};

exports.deletePost = async (req, res) => {
	try {
		const post = await models.Post.findOne({
			where: { id: req.params.id },
		});
		if (!post) {
			return res.status(401).json({ error: 'Post non trouvé !' });
		}
		await models.Post.destroy({
			where: { id: req.params.id },
		})
			.then(post =>
				res
					.status(200)
					.json({ message: 'post ' + req.params.id + ' supprimé !' }),
			)
			.catch(error => res.status(500).json({ error }));
	} catch (error) {
		res.status(500).json({ error });
	}
};
