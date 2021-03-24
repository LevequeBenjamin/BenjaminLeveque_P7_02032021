//* ******************** middleware/bruteForceReg.middleware.js ******************** *//

// import
const bruteForceReg = require('express-rate-limit');

/* ********** bruteForceReg ********** */
// 5 création de compte maximum à partir d'une même adresse IP avant d'être bloqué 1 heure
module.exports = bruteForceReg({
	windowMs: 60 * 60 * 1000,
	max: 5,
	statusCode: 200,
	message: {
		status: 429,
		errorBrute:
			"Vous avez atteint le maximum de compte, veuillez retenter dans 1 heure !",
	},
});
/* ********** bruteForceReg end ********** */
