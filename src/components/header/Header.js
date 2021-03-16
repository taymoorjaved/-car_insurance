import React from 'react';
import './Header.css';
import fridayLogo from '../../media/fridayLogo.png';
import person from '../../media/person.png';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <div className='headerContainer'>
      <div>
        <Link to='/'>
          <img alt='fridaylogo' src={fridayLogo} />
        </Link>
      </div>
      <div>
        <img alt='personicon' src={person} style={{height: '42px'}} />
      </div>
    </div>
  );
};

export default Header;
