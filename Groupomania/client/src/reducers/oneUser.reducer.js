// ******************** reducers/user.reducer.js ******************** //

// imports
import {
	GET_ONE_USER,
} from '../actions/user.actions';

// const
const initialState = {};

/* ******************** userReducer ******************** */
export default function oneUserReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ONE_USER:
			return action.payload;

		default:
			return state;
	}
}
/* ******************** userReducer end ******************** */