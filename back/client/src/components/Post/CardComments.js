import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getComments } from '../../actions/comment.actions';
import { dateParser, isEmpty } from '../Utils';

const CardComments = ({ post }) => {
	const [content, setText] = useState('');
	const usersData = useSelector(state => state.usersReducer);
	const userData = useSelector(state => state.userReducer);
	const commentData = useSelector(state => state.commentReducer);
	const dispatch = useDispatch();

	const handleComment = (e) => {
    e.preventDefault();

    if (content) {
      dispatch(addComment(post.id, userData.id, content, userData.username))
      .then(() => dispatch(getComments()))
      .then(() => setText(''));
    }
  };

	return (
		<div className="comments-container">
			{!isEmpty(commentData[0]) &&
				commentData.map(comment => {
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
												if (user.id === comment.userId) return user.pictureUrl;
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
									<span>{dateParser(comment.updatedAt)}</span>
								</div>
								<p>{comment.content}</p>
							</div>
						</div>
					);
				})}
			{userData.id && (
				<form action="" onSubmit={handleComment} className="comment-form">
					<input
						type="text"
						name="text"
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
