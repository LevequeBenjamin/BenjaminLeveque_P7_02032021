import axios from 'axios';

// comments
export const GET_COMMENTS = 'GET_COMMENTS';

export const getComments = () => {
	return dispatch => {
		return axios
			.get(`${process.env.REACT_APP_API_URL}api/post/read-comment-post`)
			.then(res => {
				dispatch({ type: GET_COMMENTS, payload: res.data });
			})
			.catch(err => console.log(err));
	};
};