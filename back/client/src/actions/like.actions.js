import axios from 'axios';

// like
export const GET_LIKES = 'GET_LIKES';
export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UNLIKE_POST';

export const getLikes = () => {
	return dispatch => {
		return axios
			.get(`${process.env.REACT_APP_API_URL}api/post/read-like-post`)
			.then(res => {
				dispatch({ type: GET_LIKES, payload: res.data });
			})
			.catch(err => console.log(err));
	};
};

export const likePost = (post, uid) => {
	return dispatch => {
		return axios.post(
			`${process.env.REACT_APP_API_URL}api/post/${post.id}/like-post/${uid}`,
		)
		.then(res => {
			dispatch({ type: GET_LIKES, payload: res.data });
		})
		.catch(err => console.log(err));
	};
};

export const unlikePost = (post, uid) => {
	return dispatch => {
		return axios.delete(
			`${process.env.REACT_APP_API_URL}api/post/${post.id}/unlike-post/${uid}`,
		)
		.then(res => {
			dispatch({ type: GET_LIKES, payload: res.data });
		})
		.catch(err => console.log(err));
	};
};
