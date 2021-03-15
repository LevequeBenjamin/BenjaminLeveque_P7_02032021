import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateComment } from '../../actions/comment.actions';
import { UidContext } from '../AppContext';
import { isEmpty } from '../Utils';

const EditDeleteComment = (comment) => {
	const [isAuthor, setIsAuthor] = useState(false);
	const [edit, setEdit] = useState(false);
	const [content, setContent] = useState('');
	const uid = useContext(UidContext);
	const dispatch = useDispatch();

let commentId = comment.comment.id;
let commentUserId = comment.comment.userId;

	 const handleEdit = (e) => {
	 	e.preventDefault();

	 	if (content) {
	 		dispatch(updateComment(commentId, content));
	 	}
	 };

	 useEffect(() => {
	 	const checkAuthor = () => {
			if (uid === commentUserId) {
				setIsAuthor(true);
			} else setIsAuthor(false);
		};
 	checkAuthor();
	}, [uid, commentUserId]);

	return (
		<div className="edit-comment">
			{isAuthor && edit === false && (
				<span onClick={() => setEdit(!edit)}>
					<img src="./img/icons/edit.svg" alt="edit-comment" />
				</span>
			)}
			{isAuthor && edit && (
				<form action="" onSubmit={handleEdit} className="edit-comment-form">
					<label htmlFor="text" onClick={() => setEdit(!edit)}>
						Editer
					</label>
					<br />
					<input
						type="text"
						name="content"
						onChange={e => setContent(e.target.value)}
						defaultValue={comment.comment.content}
					/>
					<br />
					<input type="submit" value="Valider modification" />
				</form>
			)}
		</div>
	);
};

export default EditDeleteComment;
