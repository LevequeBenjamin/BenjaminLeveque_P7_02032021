import { GET_LIKES, LIKE_POST } from '../actions/like.actions';

const initialState = {};

export default function likeReducer(state = initialState, action) {
	switch (action.type) {
		case GET_LIKES:
			return action.payload;
		case LIKE_POST:
			return {
				...state,
				userId: action.payload,
				postId: action.payload,
			};

		default:
			return state;
	}
}
