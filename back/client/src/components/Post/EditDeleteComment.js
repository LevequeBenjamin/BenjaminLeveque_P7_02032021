// ******************** components/Post/EditDeleteComment ******************** //

// imports
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, updateComment } from '../../actions/comment.actions';
import { getPosts } from '../../actions/post.actions';
import { UidContext } from '../AppContext';
import { isEmpty } from '../Utils';

/* ******************** EditDeleteComment ******************** */
const EditDeleteComment = ({comment, post}) => {
	const [isAuthor, setIsAuthor] = useState(false);
	const [edit, setEdit] = useState(false);
	const [content, setContent] = useState('');
	const uid = useContext(UidContext);
	const userData = useSelector(state => state.userReducer);
	const dispatch = useDispatch();
	
	let commentId = comment.id;
	let postId = post.id;
	const handleEdit = e => {
		e.preventDefault();
		if (content) dispatch(updateComment(commentId, content));
	};
	const handleDelete = async() => {
		await dispatch(deleteComment(commentId, postId))
		 dispatch(getPosts())
	}

	useEffect(() => {
		const checkAuthor = () => {
			if (uid === comment.userId) {
				setIsAuthor(true);
			} else setIsAuthor(false);
		};
		checkAuthor();
	}, [uid, comment.userId]);

	const userAdmin = userData.isAdmin
	console.log(userData.isAdmin)
	return (
		<div className="edit-comment">
			{isAuthor && edit === false &&(
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
						defaultValue={comment.content}
					/>
					<br />
					<div className='btn'>
						<span onClick={() => {
							if(window.confirm('Voulez-vous supprimer ce commentaire ?')) {
								handleDelete();
							}
						}}>
							<img src='./img/icons/trash.svg' alt='delete' />
						</span>
						<input type="submit" value="Valider modification" />
					</div>
					
				</form>
			)}
			{ userAdmin === true && (
					<div className='btn'>
						<span onClick={() => {
							if(window.confirm('Voulez-vous supprimer ce commentaire ?')) {
								handleDelete();
							}
						}}>
							<img src='./img/icons/trash.svg' alt='delete' />
						</span>
					</div>
			)}
		</div>
	);
};
/* ******************** EditDeleteComment end ******************** */

// export
export default EditDeleteComment;
