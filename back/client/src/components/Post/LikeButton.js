// ******************** components/Post/LikeButton ******************** //

// imports
import React, { useContext, useEffect, useState } from 'react';
import { UidContext } from '../AppContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { isEmpty } from '../Utils';
import { useDispatch, useSelector } from 'react-redux';
import { getLikes, likePost, unlikePost } from '../../actions/like.actions';
import { getPosts } from '../../actions/post.actions';

/* ******************** LikeButton ******************** */
const LikeButton = ({ post, postUsersLike }) => {
	const [liked, setLiked] = useState(false);
	//const [isLoading, setIsloading] = useState(true);
	const uid = useContext(UidContext);
	const dispatch = useDispatch();
	const likeData = useSelector(state => state.likeReducer);
	let likeId =
		!isEmpty(likeData[0]) &&
		likeData.map(likesId => {
			return likesId.id;
		});

	const getLikesPosts = () => {
		dispatch(getLikes());
		dispatch(getPosts());
	};

	const like = async () => {
		await dispatch(likePost(post, uid));

		getLikesPosts();
		setLiked(true);
		//setIsloading(false)
	};


	const unlike = async () => {
		await dispatch(unlikePost(post, uid, likeId));

		setLiked(false);
		//setIsloading(false)
	};

	useEffect(() => {
		if (!isEmpty(postUsersLike[0]) && postUsersLike.includes(uid)) {
			setLiked(true);
		} else setLiked(false);
	}, [uid, postUsersLike, liked]);

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
				<img
					src="./img/icons/heart.svg"
					onClick={like}
					alt="like"
					key={likeId}
				/>
			)}

			{uid && liked && (
				<img
					src="./img/icons/heart-filled.svg"
					onClick={unlike}
					alt="unlike"
					key={likeId}
				/>
			)}

			<span>{post.Users.length}</span>
		</div>
	);
};
/* ******************** LikeButton end ******************** */

// export
export default LikeButton;
