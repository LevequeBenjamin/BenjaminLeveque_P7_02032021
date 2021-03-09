// ******************** upload.controller ******************** //

// imports
const models = require('../models');
const fs = require('fs');
const { promisify } = require('util');
const { uploadErrors } = require('../utils/errors.utils');
const pipeline = promisify(require('stream').pipeline);

/* ******************** uploadProfil ******************** */
// permet de upload une photo
exports.uploadProfil = async (req, res) => {
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

	const filename = req.body.name + '.jpg';

	await pipeline(
		req.file.stream,
		fs.createWriteStream(
			`${__dirname}/../client/public/uploads/profil/${filename}`,
		),
	);

	try {
		const user = await models.User.findOne({
			attributes: ['pictureUrl', 'id'],
			where: { id: req.body.userId },
		});
		if (!user) {
			return res.status(401).json({ error: 'Utilisateur non trouvé !' });
		}
		console.log(user);
		await user
			.update({
				pictureUrl: './uploads/profil/' + filename,
			})
			.then(res.status(201).json({ message: 'photo ajouté !' }))
			.catch(err => res.status(500).json(err));
	} catch (error) {
		res.status(500).json({ error });
	}
};
