import React from 'react';
import './Home.css';
import mainPageLeft from '../../media/mainPageLeft.PNG';
import CarSelector from '../carSelector/CarSelector';

const Home = () => {
  return (
    <div className='mainContainer'>
      <div className='innerContainer'>
        <div className='leftContainer'>
          <img alt='homeleftimg' src={mainPageLeft} />
        </div>
        <div className='rightContainer'>
          <CarSelector />
        </div>
      </div>
    </div>
  );
};

export default Home;
