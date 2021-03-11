import axios from 'axios';

// like
export const GET_LIKES = 'GET_LIKES';
export const LIKE_POST = 'LIKE_POST';

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

export const likePost = (postId, userId) => {
	return dispatch => {
		return axios({
			method: 'patch',
			url: `${process.env.REACT_APP_API_URL}api/post/like-post/` + postId,
			data: { id: userId },
		})
			.then(res => {
				dispatch({ type: LIKE_POST, payload: { postId, userId } });
			})
			.catch(err => console.log(err));
	};
};
