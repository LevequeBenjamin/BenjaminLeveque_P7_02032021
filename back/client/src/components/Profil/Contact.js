// ******************** components/Profil/Contact.js******************** //


// import
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UidContext } from '../AppContext';
import { isEmpty } from '../Utils';

/* ******************** Contact ******************** */
const Contact = () => {
	// useState
	const [isLoading, setIsloading] = useState(true);
	const [playOnce, setPlayOnce] = useState(true);
	const [contact, setContact] = useState([]);
	// store
	const usersData = useSelector(state => state.usersReducer);
	// id de l'utilisateur connecté
	const uid = useContext(UidContext);

	// useEffect, on affiche un nombre de contact selon la hauteur de l'ecran
	useEffect(() => {
		const contact = () => {
			// on crée un tableau et on push usersData
			let array = [];
			usersData.map(user => {
				return array.push(user);
			});
			// on mélange l'odre dans le tableau
			array.sort(() => 0.5 - Math.random());
			setContact(array);
			if (window.innerHeight > 780) {
				array.length = 5;
			} else if (window.innerHeight > 720) {
				array.length = 4;
			} else if (window.innerHeight > 615) {
				array.length = 2;
			} else if (window.innerHeight > 540) {
				array.length = 1;
			} else {
				array.length = 0;
			}
		};

		if (playOnce && !isEmpty(usersData[0])) {
			contact();
			setIsloading(false);
			setPlayOnce(false);
		}
	}, [usersData, playOnce]);

	return (
		<div className="contact-container">
			<h4>Contact</h4>
			{isLoading ? (
				<div className="icon">
					<i className="fas fa-spinner fa-pulse"></i>
				</div>
			) : (
				<ul>
					{contact &&
						contact.map(user => {
							if (user.id !== uid) {
								return (
									<li className="user-hint" key={user.id}>
										<img src={user.pictureUrl} alt="user-pic" />
										<p>{user.username}</p>
									</li>
								);
							}
							return null;
						})}
				</ul>
			)}
		</div>
	);
};
/* ******************** Contact end ******************** */

// export
export default Contact;
