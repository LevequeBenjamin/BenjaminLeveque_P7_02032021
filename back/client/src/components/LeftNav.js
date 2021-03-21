// ******************** components/LeftNav ******************** //

// imports
import React from 'react';
import { NavLink } from 'react-router-dom';

/* ******************** LeftNav ******************** */
const LeftNav = () => {
  return (
    <div className='left-nav-container'>
      <div className='icons'>
        <div className='icons-bis'>
          <NavLink to='/' exact activeClassName='active-left-nav'>
            <img src='./img/icons/home.svg' alt='home' fill='$white'/>
          </NavLink>
          <br /> 
          <NavLink to='/profil' exact activeClassName='active-left-nav'>
            <img src='./img/icons/user.svg' alt='home' />
          </NavLink>
        </div>
      </div>
      
    </div>
  );
};
/* ******************** LeftNav end ******************** */

// export
export default LeftNav;