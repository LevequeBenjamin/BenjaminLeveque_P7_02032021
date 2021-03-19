import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOnePost } from '../actions/post.actions';
import { getTrends } from '../actions/trend.actions';
import CardTrend from './Post/CardTrend';
import { isEmpty } from './Utils';

const Trends = () => {
	const [showTrend, setShowTrend] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const posts = useSelector(state => state.allPostsReducer);
	const postData = useSelector(state => state.onePostReducer);
	const usersData = useSelector(state => state.usersReducer);
	const trendList = useSelector(state => state.trendingReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!isEmpty(posts[0])) {
			const postsArr = Object.keys(posts).map(i => posts[i]);

			let sortedArray = postsArr.sort((a, b) => {
				return b.Users.length - a.Users.length;
			});
			sortedArray.length = 3;
			dispatch(getTrends(sortedArray));
		}
	}, [posts, dispatch]);

	const handleTrend = post => {
		let postId = post.id;
		console.log(postId);
		dispatch(getOnePost(postId));
		setShowTrend(!showTrend);
	};

	return (
		<div className="trending-container">
			<h4>Top 3</h4>
			<ul>
				{!isEmpty(trendList) &&
					trendList.map(post => {
						return (
							<li onClick={e => handleTrend(post)} key={post.id}>
								<div>
									{post.imageUrl && <img src={post.imageUrl} alt="post-pic" />}
									{isEmpty(post.imageUrl) && (
										<img
											src={
												usersData[0] &&
												usersData
													.map(user => {
														if (user.id === post.UserId) {
															return user.pictureUrl;
														} else return null;
													})
													.join('')
											}
											alt="profil-pic"
										/>
									)}
								</div>

								<div className="trend-content">
									<p>{post.content}</p>
									{!showTrend ? (
										<span>Lire</span>
									) : (
										<span>Fermer</span>
									)}
					
								</div>
							
							</li>
						);
					})}
			</ul>
			{showTrend && <CardTrend post={postData} />}
		</div>
	);
};

export default Trends;
