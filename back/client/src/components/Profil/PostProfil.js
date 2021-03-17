// ******************** components/Profil/PostProfil ******************** //

// imports
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/post.actions';
import { UidContext } from '../AppContext';
import Card from '../Post/Card';
import { isEmpty } from '../Utils';

/* ******************** PostProfil ******************** */
const ThreadProfil = () => {
	const uid = useContext(UidContext);
	const [loadPost, setLoadPost] = useState(true);
	const [count, setCount] = useState(5);
	const dispatch = useDispatch();
	const posts = useSelector(state => state.postReducer);

	const loadMore = () => {
		if (
			window.innerHeight + document.documentElement.scrollTop + 1 >
			document.scrollingElement.scrollHeight
		) {
			setLoadPost(true);
		}
	};

	useEffect(() => {
		if (loadPost) {
			dispatch(getPosts(count));
			setLoadPost(false);
			setCount(count + 5);
		}
		window.addEventListener('scroll', loadMore);
		return () => window.removeEventListener('scroll', loadMore);
	}, [loadPost, dispatch, count]);

	return (
		<div className="thread-container">
			<ul>
				{!isEmpty(posts[0]) &&
					posts.map(post => {
						if (post.UserId === uid) return <Card post={post} key={post.id} />
						return null
					}
			
					) }		
			</ul>
		</div>
	);
};
/* ******************** PostProfil end ******************** */

// export
export default ThreadProfil;
