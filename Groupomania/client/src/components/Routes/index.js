// ******************** components/Routes/index.js ******************** //

// imports
import React from 'react';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Navbar from '../Navbar';

/* ******************** index ******************** */
const index = () => {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/profil" exact component={Profil} />
				<Redirect to="/" />
			</Switch>
		</Router>
	);
};
/* ******************** index end ******************** */

// export
export default index;
