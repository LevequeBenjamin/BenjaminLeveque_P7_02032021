import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLikes } from '../../actions/like.actions';
import { deletePost, getPosts, updatePost } from '../../actions/post.actions';
import { dateParser, isEmpty } from '../Utils';
import CardComments from './CardComments';
import LikeButton from './LikeButton';

const Card = ({ post }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isUpdated, setIsUpdated] = useState(false);
	const [textUpdate, setTextUpdate] = useState(null);
	const [showComments, setShowComments] = useState(false);
	const usersData = useSelector(state => state.usersReducer);
	const userData = useSelector(state => state.userReducer);
	const dispatch = useDispatch();
	//const commentData = useSelector(state => state.commentReducer);
	const likeData = useSelector(state => state.likeReducer);
	const commentData = useSelector(state => state.commentReducer);

	const updateItem = () => {
		if (textUpdate) {
			dispatch(updatePost(post.id, textUpdate));
		}
		setIsUpdated(false);
	};

	const deleteQuote = async () => {
		await dispatch(deletePost(post.id));
		dispatch(getPosts());
		dispatch(getLikes());
	};

	useEffect(() => {
		!isEmpty(usersData[0]) && setIsLoading(false);
	}, [usersData]);

	return (
		<li className="card-container" key={post.id}>
			{isLoading ? (
				<i className="fas fa-spinner fa-spin"></i>
			) : (
				<>
					<div className="card-left">
						<img
							src={
								!isEmpty(usersData[0]) &&
								usersData
									.map(user => {
										if (user.id === post.UserId) return user.pictureUrl;
										else return null;
									})
									.join('')
							}
							alt="poster-pic"
						/>
					</div>
					<div className="card-right">
						<div className="card-header">
							<div className="pseudo">
								<h3>
									{!isEmpty(usersData[0]) &&
										usersData.map(user => {
											if (user.id === post.UserId) return user.username;
											else return null;
										})}
								</h3>
							</div>
							<span>{dateParser(post.createdAt)}</span>
						</div>
						{isUpdated === false && <p>{post.content}</p>}
						{isUpdated && (
							<div className="update-post">
								<textarea
									defaultValue={post.content}
									onChange={e => setTextUpdate(e.target.value)}
								/>
								<div className="button-container">
									<button className="btn" onClick={updateItem}>
										Valider modification
									</button>
								</div>
							</div>
						)}
						{post.imageUrl && (
							<img src={post.imageUrl} alt="card-pic" className="card-pic" />
						)}
						{post.video && (
							<iframe
								width="500"
								height="300"
								src={post.video}
								frameBorder="0"
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"'
								allowFullScreen
								title={post.id}
							></iframe>
						)}
						{userData.id === post.UserId && (
							<div className="button-container">
								<div onClick={() => setIsUpdated(!isUpdated)}>
									<img src="./img/icons/edit.svg" alt="edit" />
								</div>
								<div
									onClick={() => {
										if (
											window.confirm(
												'Voulez-vous vraiment supprimer ce message ?',
											)
										) {
											deleteQuote();
										}
									}}
								>
									<img src="./img/icons/trash.svg" alt="trash" />
								</div>
							</div>
						)}
						<div className="card-footer">
							<div className="comment-icon">
								<img
									onClick={() => setShowComments(!showComments)}
									src="./img/icons/message1.svg"
									alt="comments"
								/>
						




								<span>{post.comments}</span>
							</div>
							<div>
								<LikeButton
									key={!isEmpty(likeData[0] && likeData.map(likeDb => likeDb.id))} post={post} 
									postUsersLike={
										!isEmpty(post.Users[0]) &&
										post.Users.map(likersId => {
											if (likersId.Like) return likersId.Like.userId;
											else return null;
										})
									}
								/>
							</div>
							<img src="./img/icons/share.svg" alt="share" />
						</div>
						
						{showComments &&<CardComments post={post}/>}
					</div>
				</>
			)}
		</li>
	);
};

export default Card;
