// ******************** components/Log/SignInForm ******************** //

// imports
import React, { useState } from 'react';
import axios from 'axios';

/* ******************** SignInForm ******************** */
const SignInForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = e => {
		e.preventDefault();
		const emailError = document.querySelector('.email.error');
		const passwordError = document.querySelector('.password.error');

		// methode post, on passe email et password en data
		axios({
			method: 'post',
			url: `${process.env.REACT_APP_API_URL}api/user/login`,
			withCredentials: true,
			data: {
				email,
				password,
			},
		})
			.then(res => {
				if (res.data.errorEmail || res.data.errorPassword) {
					if (res.data.errorEmail) {
						emailError.innerHTML = res.data.errorEmail;
						passwordError.innerHTML = '';
					}
					if (res.data.errorPassword) {
						passwordError.innerHTML = res.data.errorPassword;
						emailError.innerHTML = '';
					}
				} else {
					window.location = '/';
				}
			})
			.catch(error => {
				console.log(error);
			});
	};

	return (
		<form action="" onSubmit={handleLogin} id="sign-up-form">
			<label htmlFor="email">Email</label>
			<br />
			<input
				type="text"
				name="email"
				id="email"
				onChange={e => setEmail(e.target.value)}
				value={email}
			/>
			<div className="email error"></div>
			<br />
			<label htmlFor="password">Mot de passe</label>
			<br />
			<input
				type="password"
				name="password"
				id="password"
				onChange={e => setPassword(e.target.value)}
				value={password}
			/>
			<div className="password error"></div>
			<br />
			<input type="submit" value="Se connecter" />
		</form>
	);
};
/* ******************** SignInForm end ******************** */

// export
export default SignInForm;
