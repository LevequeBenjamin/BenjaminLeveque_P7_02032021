import React, { useContext, useEffect, useState } from 'react';
import { UidContext } from '../AppContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { isEmpty } from '../Utils';
import { useDispatch, useSelector } from 'react-redux';
import { getLikes, likePost, unlikePost } from '../../actions/like.actions';
import { getPosts } from '../../actions/post.actions';

const LikeButton = ({ post, postUsersLike }) => {
	const [liked, setLiked] = useState(false);
	const uid = useContext(UidContext);
	const dispatch = useDispatch();
	const likeData = useSelector(state => state.likeReducer);

	const like = () => {
		dispatch(likePost(post, uid));

		dispatch(getPosts());
		dispatch(getLikes());
		setLiked(true);
	};

	const unlike = () => {
		dispatch(unlikePost(post, uid));

		dispatch(getPosts());
		dispatch(getLikes());
		setLiked(false);
	};

	useEffect(() => {
		if (!isEmpty(postUsersLike[0]) && postUsersLike.includes(uid)) {
			setLiked(true);
		} else setLiked(false);
	}, [uid, postUsersLike, liked]);

	console.log(postUsersLike);

	return (
		<div className="like-container">
			{uid === null && (
				<Popup
					trigger={<img src="./img/icons/heart.svg" alt="like" />}
					position={['bottom center', 'bottom right', 'bottom left']}
					closeOnDocumentClick
				>
					<div>Connectez-vous pour aimer un post !</div>
				</Popup>
			)}

			{uid && liked === false && (
				<img src="./img/icons/heart.svg" onClick={like} alt="like" />
			)}

			{uid && liked && (
				<img src="./img/icons/heart-filled.svg" onClick={unlike} alt="unlike" />
			)}

			<span>{post.Users.length}</span>
		</div>
	);
};

export default LikeButton;
