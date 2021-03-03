/* **********FICHIER app.js CONTIENT NOTRE APPLICATION********** */
// imports
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require("./routes/user.routes");
const { checkUser, requireAuth } = require('./middleware/auth.middleware');


const app = express();

// Middleware Header qui permet à toutes les demandes de toutes les origines d'accéder à l'API
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, PATCH, OPTIONS',
	);
	next();
});

// Middleware qui permet de transformer le corp de la requête en un objet JSON utilisable
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

// routes
app.use('/api/user', userRoutes);

// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
	res.status(200).json(res.locals.user)
});



// Export de l'application express pour déclaration dans server.js
module.exports = app;