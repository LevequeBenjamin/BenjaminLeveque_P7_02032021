// ******************** user.actions ******************** //

// imports
import axios from 'axios';

// const
export const GET_USER = 'GET_USER';
export const UPLOAD_PICTURE = 'UPLOAD_PICTURE';
export const UPDATE_BIO = 'UPDATE_BIO';
export const DELETE_USER = 'DELETE_USER'

// errors
export const GET_USER_ERRORS = 'GET_USER_ERRORS';

/* ******************** getUser ******************** */
export const getUser = uid => {
	return dispatch => {
		return axios
			.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
			.then(res => {
				dispatch({ type: GET_USER, payload: res.data });
			})
			.catch(err => console.log(err));
	};
};
/* ******************** getUser end ******************** */

/* ******************** uploadPicture ******************** */
export const uploadPicture = (data, id) => {
	return dispatch => {
		return axios
			.post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
			.then(res => {
				if (res.data.errors) {
					dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
				} else {
					dispatch({ type: GET_USER_ERRORS, payload: '' });
					return axios
						.get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
						.then(res => {
							dispatch({ type: UPLOAD_PICTURE, payload: res.data.pictureUrl });
						});
				}
			})
			.catch(err => console.log(err));
	};
};
/* ******************** uploadPicture end ******************** */

/* ******************** updateBio ******************** */
export const updateBio = (id, bio) => {
	return dispatch => {
		return axios({
			method: 'put',
			url: `${process.env.REACT_APP_API_URL}api/user/` + id,
			data: { bio },
		})
			.then(res => {
				dispatch({ type: UPDATE_BIO, payload: bio });
			})
			.catch(err => console.log(err));
	};
};
/* ******************** updateBio end ******************** */

// /* ******************** deleteUser ******************** */
// export const deleteUser = (id, password) => {
// 	return dispatch => {
// 		return axios({
// 			method: 'delete',
// 			url: `${process.env.REACT_APP_API_URL}api/user/${id}`,
// 			data: {password},
// 		})
// 		.then(res => {
// 			console.log(res.data.errorPassword);
// 			if (res.data.errorPassword) {
// 				emailPassword.innerHTML = res.data.errorEmail;
// 			} else {
// 				dispatch({ type: GET_USER_ERRORS, payload: '' });
// 			}
// 		})
// 			.catch(err => console.log(err));
// 	};
// };
// /* ******************** deleteUser end ******************** */
