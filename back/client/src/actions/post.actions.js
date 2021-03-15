import axios from 'axios';

// posts
export const GET_POSTS = 'GET_POSTS';
export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';

export const getPosts = num => {
	return dispatch => {
		return axios
			.get(`${process.env.REACT_APP_API_URL}api/post`)
			.then(res => {
				const array = res.data.slice(0, num);
				dispatch({ type: GET_POSTS, payload: array });
			})
			.catch(err => console.log(err));
	};
};

export const addPost = (data) => {
	console.log(data)
	return dispatch => {
		return axios
			.post(`${process.env.REACT_APP_API_URL}api/post`, data)
	};
};


export const updatePost = (postId, content) => {
	return dispatch => {
		return axios({
			method: 'put',
			url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
			data: { content },
		})
			.then(res => {
				dispatch({ type: UPDATE_POST, payload: { content, postId } });
			})
			.catch(err => console.log(err));
	};
};

export const deletePost = (postId) => {
	return dispatch => {
		return axios({
			method: 'delete',
			url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
		})
			.then(res => {
				dispatch({ type: DELETE_POST, payload: { postId } });
			})
			.catch(err => console.log(err));
	};
}
