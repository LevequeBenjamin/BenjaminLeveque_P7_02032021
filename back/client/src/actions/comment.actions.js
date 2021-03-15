import axios from 'axios';

// comments
export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT'

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

export const addComment = (post, userData, content) => {
	let commenterId = userData.username;

	return dispatch => {
		return axios.patch(
			`${process.env.REACT_APP_API_URL}api/post/${post.id}/comment-post/${userData.id}`,
			{ content, commenterId },
		);
	};
};

export const deleteComment = (post, userData) => {
	return dispatch => {
		return axios.delete(
			`${process.env.REACT_APP_API_URL}api/post/${post.id}/delete-comment-post/${userData.id}`,
		);
	};
};

export const updateComment = (commentId, content) => {
	return dispatch => {
		return axios.patch(
			`${process.env.REACT_APP_API_URL}api/post/comment-post/${commentId}` ,{content},
		).then(res => {
			dispatch({ type: UPDATE_COMMENT, payload: {commentId, content } });
		})
		.catch(err => console.log(err));
	} 
}
