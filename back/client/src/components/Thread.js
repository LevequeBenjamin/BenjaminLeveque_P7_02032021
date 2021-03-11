import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/post.actions';
import Card from './Post/Card';
import { isEmpty } from './Utils';

const Thread = () => {
	const [loadPost, setLoadPost] = useState(true);
	const dispatch = useDispatch();
	const posts = useSelector(state => state.postReducer);
	//const usersData = useSelector(state => state.usersReducer);

	useEffect(() => {
		if (loadPost) {
			dispatch(getPosts());
			setLoadPost(false);
		}
	}, [loadPost, dispatch]);

	return (
		<div className="thread-container">
      
			 <ul>
				  { !isEmpty(posts[0]) &&
					posts.map((post) => (
						 <Card post={post} key={post.id} />
          ))}  
			</ul> 
		</div>
	);
};

export default Thread;
