// ******************** users.actions ******************** //

// imports
import axios from 'axios';

// const
export const GET_USERS = 'GET_USERS';

/* ******************** getUsers ******************** */
export const getUsers = () => {
	return dispatch => {
		return axios
			.get(`${process.env.REACT_APP_API_URL}api/user`)
			.then(res => {
				dispatch({ type: GET_USERS, payload: res.data });
			})
			.catch(err => console.log(err));
	};
};
/* ******************** getUsers end ******************** */
