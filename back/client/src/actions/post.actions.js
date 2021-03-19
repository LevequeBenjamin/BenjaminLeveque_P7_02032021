// ******************** post.actions ******************** //

// import
import axios from 'axios';

// const
export const GET_POSTS = 'GET_POSTS';
export const GET_ONE_POST = 'GET_ONE_POST';
export const GET_ALL_POSTS = 'GET_ALL_POSTS';
export const ADD_POST = 'ADD_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';

// errors
export const GET_POST_ERRORS = 'GET_POST_ERRORS';

/* ******************** getPosts ******************** */
export const getPosts = num => {
	return dispatch => {
		return axios
			.get(`${process.env.REACT_APP_API_URL}api/post`)
			.then(res => {
				const array = res.data.slice(0, num);
				dispatch({ type: GET_POSTS, payload: array });
				dispatch({ type: GET_ALL_POSTS, payload: res.data });
			})
			.catch(err => console.log(err));
	};
};
/* ******************** getPosts end ******************** */

/* ******************** getOnePost ******************** */
export const getOnePost = (postId) => {
	return dispatch => {
		return axios
			.get(`${process.env.REACT_APP_API_URL}api/post/read-one-post/${postId}`)
			.then(res => {
				dispatch({ type: GET_ONE_POST, payload: res.data });
			})
			.catch(err => console.log(err));
	};
};
/* ******************** getOnePost end ******************** */

/* ******************** addPost ******************** */
export const addPost = data => {
	console.log(data);
	return dispatch => {
		return axios
			.post(`${process.env.REACT_APP_API_URL}api/post`, data)
			.then(res => {
				console.log(res.data);
				if (res.data.errors) {
					dispatch({ type: GET_POST_ERRORS, payload: res.data.errors });
				} else {
					dispatch({ type: GET_POST_ERRORS, payload: '' });
				}
			});
	};
};
/* ******************** addPost end ******************** */

/* ******************** updatePost ******************** */
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
/* ******************** updatePost end ******************** */

/* ******************** deletePost ******************** */
export const deletePost = postId => {
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
};
/* ******************** deletePost end ******************** */


