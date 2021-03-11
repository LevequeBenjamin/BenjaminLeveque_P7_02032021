import React from 'react';
import LeftNav from '../components/LeftNav';
import Thread from '../components/Thread';

const Home = () => {
	return (
		<div className="home">
			<LeftNav />
      <div className='nain'>
        <Thread />
      </div>
		</div>
	);
};

export default Home;
