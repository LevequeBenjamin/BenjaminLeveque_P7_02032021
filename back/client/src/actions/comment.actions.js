import axios from 'axios';

// comments
export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';

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

export const addComment = (postId, commenterId, content, userId) => {
	return (dispatch) => {
		return axios({
				method: 'patch',
				url: `${process.env.REACT_APP_API_URL}api/post/${postId}/comment-post`,
				data: { content, commenterId, userId },
			})
				.then(res => {
					dispatch({ type: ADD_COMMENT, payload: { postId } });
				})
				.catch(err => console.log(err))
		}
	}
