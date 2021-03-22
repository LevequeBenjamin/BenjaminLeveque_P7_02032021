// ******************** reducers/trending.reducer.js ******************** //

// import
import { GET_TRENDS } from '../actions/trend.actions';

// const
const initialState = {};

/* ******************** trendingReducer ******************** */
export default function trendingReducer(state = initialState, action) {
	switch (action.type) {
		case GET_TRENDS:
			return action.payload;
		default:
			return state;
	}
}
/* ******************** trendingReducer end ******************** */
