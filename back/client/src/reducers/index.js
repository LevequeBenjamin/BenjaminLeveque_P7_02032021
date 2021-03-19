// ******************** Index ******************** //

// imports
import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import usersReducer from './users.reducer';
import postReducer from './post.reducer';
import allPostsReducer from './allPosts.reducer';
import commentReducer from './comment.reducer';
import likeReducer from './like.reducer';
import errorReducer from './error.reducer';
import trendingReducer from './trending.reducer';
import onePostReducer from './onePost.reducer';

/* ******************** combineReducers ******************** */
export default combineReducers({
	userReducer,
	usersReducer,
	postReducer,
	allPostsReducer,
	commentReducer,
	likeReducer,
	errorReducer,
	trendingReducer,
	onePostReducer
});
/* ******************** combineReducers ******************** */
