// ******************** post.reducer ******************** //

// imports
import { GET_ONE_POST } from '../actions/post.actions';

// const
const initialState = {};

/* ******************** postReducer ******************** */
export default function onePostReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ONE_POST:
			return action.payload;

		default:
			return state;
	}
}
/* ******************** postReducer end ******************** */
