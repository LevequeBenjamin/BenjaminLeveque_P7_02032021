// ******************** reducers/users.reducer.js ******************** //

// imports
import { GET_USERS } from '../actions/users.actions';

// const
const initialState = {};

/* ******************** usersReducer ******************** */
export default function usersReducer(state = initialState, action) {
	switch (action.type) {
		case GET_USERS:
			return action.payload;
		default:
			return state;
	}
}
/* ******************** usersReducer end ******************** */
