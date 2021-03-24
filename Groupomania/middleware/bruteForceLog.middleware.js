//* ******************** middleware/bruteForceLog.middleware.js ******************** *//

// import
const bruteForceLog = require('express-rate-limit');

/* ********** bruteForceLog ********** */
// 5 tentatives maximum avant d'être bloqué 5 min
module.exports = bruteForceLog({
	windowMs: 5 * 60 * 1000,
	max: 5,
	statusCode: 200,
	message: {
		status: 429,
		errorBrute:
			"Vous avez atteint le maximum d'essais, veuillez retenter dans 5 minutes !",
	},
});
/* ********** bruteForceLog end ********** */
