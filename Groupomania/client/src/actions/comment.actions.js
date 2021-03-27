// ******************** actions/comment.actions ******************** //

// imports
import axios from 'axios';

// const
export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

/* ******************** getComments ******************** */
export const getComments = () => {
	return dispatch => {
		return axios({
			method: 'get',
			url: `${process.env.REACT_APP_API_URL}api/post/read-comment-post`,
			withCredentials: true,
		})
			.then(res => {
				dispatch({ type: GET_COMMENTS, payload: res.data });
			})
			.catch(err => console.log(err));
	};
};
/* ******************** getComments end ******************** */

/* ******************** addComment ******************** */
export const addComment = (post, userData, content) => {
	let commenterId = userData.username;
	let postId = post.id;
	return dispatch => {
		return axios({
			method: 'patch',
			url: `${process.env.REACT_APP_API_URL}api/post/${post.id}/comment-post/${userData.id}`,
			data: { content, commenterId },
			withCredentials: true,
		})
			.then(res => {
				dispatch({ type: ADD_COMMENT, payload: postId });
			})
			.catch(err => console.log(err));
	};
};
/* ******************** addComment end ******************** */

/* ******************** deleteComment ******************** */
export const deleteComment = (commentId, postId) => {
	return dispatch => {
		return axios({
			method: 'delete',
			url: `${process.env.REACT_APP_API_URL}api/post/${postId}/delete-comment-post/${commentId}`,
			withCredentials: true,
		})
			.then(res => {
				dispatch({ type: DELETE_COMMENT, payload: { commentId } });
			})
			.catch(err => console.log(err));
	};
};
/* ******************** deleteComment end ******************** */

/* ******************** updateComment ******************** */
export const updateComment = (commentId, content) => {
	return dispatch => {
		return axios({
			method: 'patch',
			url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${commentId}`,
			data: { content },
			withCredentials: true,
		})
			.then(res => {
				dispatch({ type: UPDATE_COMMENT, payload: { commentId, content } });
			})
			.catch(err => console.log(err));
	};
};
/* ******************** updateComment end ******************** */
