// ******************** components/Post/CardComments ******************** //

// imports
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getComments } from '../../actions/comment.actions';
import { getPosts } from '../../actions/post.actions';
import { isEmpty, timestamParser } from '../Utils';
import EditDeleteComment from './EditDeleteComment';

/* ******************** CardComments ******************** */
const CardComments = ({ post }) => {
	const [content, setText] = useState('');
	const usersData = useSelector(state => state.usersReducer);
	const userData = useSelector(state => state.userReducer);
	const commentData = useSelector(state => state.commentReducer);
	const dispatch = useDispatch();

	const handleComment = async e => {
		e.preventDefault();

		if (content) {
			await dispatch(addComment(post, userData, content));
			dispatch(getComments());
			dispatch(getPosts());
			setText('');
		} else {
			alert('Veuillez entrer un message');
		}
	};

	return (
		<div className="comments-container">
			{!isEmpty(commentData[0]) &&
				commentData.map(comment => {
					if (comment.postId === post.id) {
						return (
							<div
								className={
									comment.userId === userData.id 
										? 'comment-container client'
										: 'comment-container'
								}
								key={comment.id}
							>
								<div className="letf-part">
									<img
										src={
											!isEmpty(usersData[0]) &&
											usersData
												.map(user => {
													if (user.id === comment.userId)
														return user.pictureUrl;
													else return null;
												})
												.join('')
										}
										alt="commenter-pic"
									/>
								</div>

								<div className="right-part">
									<div className="comment-header">
										<div className="pseudo">
											<h3>{comment.commenterId}</h3>
										</div>
										<span>{timestamParser(comment.updatedAt)}</span>
									</div>

									<p>{comment.content}</p>
								</div>
								<span></span>
								<EditDeleteComment comment={comment} post={post}/>
							</div>
						);
					}
					return null;
				})}
			{userData.id && (
				<form action="" onSubmit={handleComment} className="comment-form">
					<input
						type="text"
						id="content"
						name="content"
						onChange={e => setText(e.target.value)}
						value={content}
						placeholder="Laisser un commentaire"
					/>
					<br />
					<input type="submit" value="Envoyer" />
				</form>
			)}
		</div>
	);
};
/* ******************** CardComments end ******************** */

// export
export default CardComments;
