/* ******************** errors.utils ******************** */

// ******************** signUpErrors ******************** //
exports.signUpErrors = err => {
	let errors = { pseudo: '', email: '' };

	if (
		err.name === 'SequelizeUniqueConstraintError' &&
		Object.keys(err.fields)[0].includes('Users.email')
	)
		errors.email = 'Cet email est déjà enregistré';

	if (
		err.name === 'SequelizeUniqueConstraintError' &&
		Object.keys(err.fields)[0].includes('Users.username')
	)
		errors.pseudo = 'Ce pseudo est déjà pris';

	return errors;
};
// ******************** signUpErrors end ******************** //

exports.uploadErrors = err => {
	let errors = { format: '', maxSize: '' };

	if (err.message.includes('invalid file'))
		errors.format = 'Format incompatible';

	if (err.message.includes('max size'))
		errors.maxSize = 'Le fichier dépasse 500ko';

	return errors;
};
