// ******************** like.actions ******************** //

import axios from 'axios';

// const
export const GET_LIKES = 'GET_LIKES';
export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UNLIKE_POST';

/* ******************** getLikes ******************** */
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
/* ******************** getLikes end ******************** */

/* ******************** likePost ******************** */
export const likePost = (post, uid) => {
	return dispatch => {
		return axios
			.patch(
				`${process.env.REACT_APP_API_URL}api/post/${post.id}/like-post/${uid}`,
			)
			// .then(res => {
			// 	dispatch({ type: LIKE_POST, payload: post.id });
			// })
			// .catch(err => console.log(err));
	};
};
/* ******************** likePost end ******************** */

/* ******************** unlikePost ******************** */
export const unlikePost = (post, uid) => {
	let postId = post.id;
	return dispatch => {
		return axios
			.delete(
				`${process.env.REACT_APP_API_URL}api/post/${post.id}/unlike-post/${uid}`,
			)
			// .then(res => {
			// 	let postLikedId = post.id;
			// 	dispatch({ type: UNLIKE_POST, payload:{postLikedId, uid} });
			// })
			// .catch(err => console.log(err));
			.then(res => {
				dispatch({ type: UNLIKE_POST, payload: {postId, uid} });
			})
			.catch(err => console.log(err));
	};
};
/* ******************** unlikePost end ******************** */
