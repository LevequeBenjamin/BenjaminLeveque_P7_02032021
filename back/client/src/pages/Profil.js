// ******************** pages/Profil ******************** //

// import
import React, { useContext } from 'react';
import Log from '../components/Log';
import { UidContext } from '../components/AppContext';
import UpdateProfil from '../components/Profil/UpdateProfil';
import NewPostForm from '../components/Post/NewPostForm';
import ThreadProfil from '../components/Profil/PostProfil';

/* ******************** Profil ******************** */
const Profil = () => {
	const uid = useContext(UidContext);

	return (
		<div className="profil-page">
			{uid ? (
				<UpdateProfil />
			) : (
				<div className="log-container">
					<Log signin={false} signup={true} />
					<div className="img-container">
						<img src="./img/icon-left-font.svg" alt="" />
					</div>
				</div>
			)}
			{ uid && <NewPostForm /> 
			}
			{ uid && <ThreadProfil />
			}
		</div>
	);
};
/* ******************** Profil end ******************** */

// export
export default Profil;
