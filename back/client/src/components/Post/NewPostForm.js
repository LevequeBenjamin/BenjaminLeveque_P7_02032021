import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addPost, getPosts, GET_POSTS } from '../../actions/post.actions';
import { timestamParser, isEmpty } from '../Utils';

const NewPostForm = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [content, setContent] = useState('');
	const [imageUrl, setImageUrl] = useState(null);
	const [video, setVideo] = useState('');
	const [file, setFile] = useState();
	const userData = useSelector(state => state.userReducer);
	const dispatch = useDispatch();

	const handlePicture = e => {
		setImageUrl(URL.createObjectURL(e.target.files[0]));
		setFile(e.target.files[0]);
		setVideo('');
	};

	const handlePost = async () => {
		if (content || imageUrl || video) {
			const data = new FormData();
			data.append('userId', userData.id);
			data.append('content', content);
			if (file) data.append('file', file);
			data.append('video', video);
			//console.log(data)

      await dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
		} else {
			alert('Veuillez entrer un message');
		}
	};


	const cancelPost = () => {
		setContent('');
		setImageUrl('');
		setVideo('');
		setFile('');
	};

	const handleVideo = () => {
		let findLink = content.split(' ');
		for (let i = 0; i < findLink.length; i++) {
			if (
				findLink[i].includes('https://www.yout') ||
				findLink[i].includes('https://yout')
			) {
				let embed = findLink[i].replace('watch?v=', 'embed/');
				setVideo(embed.split('&')[0]);
				findLink.splice(i, 1);
				setContent(findLink.join(' '));
				setImageUrl('');
			}
		}
	};

	useEffect(() => {
		if (!isEmpty(userData)) setIsLoading(false);
		handleVideo();
	}, [userData, content, video]);

	return (
		<div className="post-container">
			{isLoading ? (
				<i className="fas fa-spinner fa-pulse"></i>
			) : (
				<>
					<NavLink exact to="/profil">
						<div className="user-info">
							<img src={userData.pictureUrl} alt="user-img" />
						</div>
					</NavLink>
					<div className="post-form">
						<textarea
							name="content"
							id="content"
							placeholder="Quoi de neuf ?"
							onChange={e => setContent(e.target.value)}
							value={content}
						/>
						{content || imageUrl || video.length > 20 ? (
							<li className="card-container">
								<div className="card-left">
									<img src={userData.pictureUrl} alt="user-pic" />
								</div>
								<div className="card-right">
									<div className="card-header">
										<div className="pseudo">
											<h3>{userData.username}</h3>
										</div>
										<span>{timestamParser(Date.now())}</span>
									</div>
									<div className="content">
										<p>{content}</p>
										<img src={imageUrl} alt="" />
										{video && (
											<iframe
												src={video}
												frameBorder="0"
												allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"'
												allowFullScreen
												title={video}
											></iframe>
										)}
									</div>
								</div>
							</li>
						) : null}
						<div className="footer-form">
							<div className="icons">
								{isEmpty(video) && (
									<>
										<img src="./img/icons/picture.svg" alt="img" />
										<input
											type="file"
											id="file-upload"
											name="file"
											accept=".jpg, .jpeg, .png"
											onChange={e => handlePicture(e)}
										/>
									</>
								)}
								{video && (
									<button onClick={() => setVideo('')}>Supprimer vidéo</button>
								)}
							</div>
							<div className="btn-send">
								{content || imageUrl || video.length > 20 ? (
									<button className="cancel" onClick={cancelPost}>
										Annuler message
									</button>
								) : null}
								<button className="send" onClick={handlePost}>
									Envoyer
								</button>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default NewPostForm;
