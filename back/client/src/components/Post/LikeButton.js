import React, { useContext, useEffect, useState } from 'react';
import { UidContext } from '../AppContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { isEmpty } from '../Utils';
import { useDispatch, useSelector } from 'react-redux';
import { likePost } from '../../actions/like.actions';

const LikeButton = ({ post }) => {
	const [liked, setLiked] = useState(false);
	const uid = useContext(UidContext);
	const likeData = useSelector(state => state.likeReducer);
	const dispatch = useDispatch();

	const like = () => {
		dispatch(likePost(post.id, uid));
		setLiked(true);
	};

	const unlike = () => {};
	
	useEffect(() => {
		!isEmpty(likeData[0]) &&
		
			likeData.map(like => {
				for (let i = 0; i < likeData.length; i++) {
					if (likeData[i].userId === uid && post.id === likeData[i].postId) {
						setLiked(true)
					} 
				} return null
			});
	}, [uid, likeData, liked, post, dispatch]);

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
		</div>
	);
};

export default LikeButton;
