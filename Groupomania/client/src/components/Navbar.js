// ******************** components/Navbar.js ******************** //

// imports
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';
import Logout from './Log/Logout';

/* ******************** Navbar ******************** */
const Navbar = () => {
	// id de l'utilisateur connecté
	const uid = useContext(UidContext);
	// store
	const userData = useSelector(state => state.userReducer);

	return (
		<nav>
			<div className="nav-container">
				<div className="logo">
					<NavLink exact to="/">
						<div className="logo">
							<img src="./img/icon.svg" alt="icon" />
							<h3>Groupomania</h3>
						</div>
					</NavLink>
				</div>
				{uid ? (
					<ul>
						<li></li>
						<li className="welcome">
							<NavLink exact to="/profil">
								<h5>Bienvenue {userData.username}</h5>
							</NavLink>
						</li>
						<Logout />
					</ul>
				) : (
					<ul>
						<li></li>
						<li>
							<NavLink exact to="/profil">
								<img src="./img/icons/login.svg" alt="login" />
							</NavLink>
						</li>
					</ul>
				)}
			</div>
		</nav>
	);
};
/* ******************** Navbar end ******************** */

// export
export default Navbar;
