import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	addComment,
	deleteComment,
	getComments,
} from '../../actions/comment.actions';
import { isEmpty, timestamParser } from '../Utils';
import EditDeleteComment from './EditDeleteComment';

const CardComments = ({ post }) => {
	const [content, setText] = useState('');
	const usersData = useSelector(state => state.usersReducer);
	const userData = useSelector(state => state.userReducer);
	//const uid = useContext(UidContext);
	const commentData = useSelector(state => state.commentReducer);
	const dispatch = useDispatch();

	const handleComment = async e => {
		e.preventDefault();

		if (content) {
			await dispatch(addComment(post, userData, content));
			dispatch(getComments());
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
								key={post.id}
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
								<EditDeleteComment
									comment={comment}
								/>
							</div>
						);
					}
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

export default CardComments;
