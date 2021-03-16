import React, {useEffect, useState} from 'react';
import './CarDetails.css';
import demoCar from '../../media/demoCar.png';
import tick from '../../media/tick.png';

function CarDetails(props) {
  const [details, setDetails] = useState([]);
  const [searchByFuel, setSearchByFuel] = useState('');
  const [searchByBody, setSearchByBody] = useState('');
  const [searchByPS, setSearchByPS] = useState('');
  const [searchByKW, setSearchByKW] = useState('');
  const [searchByEC, setSearchByEC] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sumbitted, setSubmited] = useState(false);

  const make = props.match.params.make;
  const model = props.match.params.model;
  useEffect(() => {
    fetch(`http://localhost:8080/api/vehicles?make=${make}&model=${model}`)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setDetails(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [make, model]);

  return (
    <>
      {sumbitted ? (
        <div className='successContiner'>
          <img alt='tick' src={tick} />
          <h1>Thank You!</h1>
          <h1>We will contact you shortly</h1>
        </div>
      ) : (
        <div>
          <div className='filtersContainer'>
            <h1 className='filterHeading'>Search Your Car By Filters</h1>
            <input
              type='number'
              placeholder='Search by Engine Power (PS)'
              onChange={(e) => setSearchByPS(e.target.value)}
            />
            <input
              type='number'
              placeholder='Search by Engine Power (KW)'
              onChange={(e) => setSearchByKW(e.target.value)}
            />
            <input
              type='text'
              placeholder='Search by Fuel Type'
              onChange={(e) => setSearchByFuel(e.target.value)}
            />
            <input
              type='text'
              placeholder='Search by Body Type'
              onChange={(e) => setSearchByBody(e.target.value)}
            />
            <input
              type='number'
              placeholder='Search by Engine Capacity'
              onChange={(e) => setSearchByEC(e.target.value)}
            />
          </div>
          <div className='mainDetails'>
            {isLoading ? <div className='loader'></div> : null}

            {details.map((detail, i) => {
              if (
                searchByFuel !== '' &&
                detail.fuelType
                  .toLowerCase()
                  .indexOf(searchByFuel.toLowerCase())
              ) {
                return null;
              } else if (
                searchByBody !== '' &&
                detail.bodyType
                  .toLowerCase()
                  .indexOf(searchByBody.toLowerCase())
              ) {
                return null;
              } else if (
                searchByPS !== '' &&
                detail.enginePowerPS.toString().indexOf(searchByPS.toString())
              ) {
                return null;
              } else if (
                searchByKW !== '' &&
                detail.enginePowerKW.toString().indexOf(searchByKW.toString())
              ) {
                return null;
              } else if (
                searchByEC !== '' &&
                detail.engineCapacity.toString().indexOf(searchByEC.toString())
              ) {
                return null;
              }
              return (
                <div className='detailContainer' key={i}>
                  <img alt='democar' src={demoCar} className='detailCarImg' />
                  <h3>Make: {detail.make}</h3>
                  <h3>Model: {detail.model}</h3>
                  <h3>EnginePowerPS: {detail.enginePowerPS}</h3>
                  <h3>EnginePowerKW: {detail.enginePowerKW}</h3>
                  <h3>FuelType: {detail.fuelType}</h3>
                  <h3>BodyType: {detail.bodyType}</h3>
                  <h3>EngineCapacity: {detail.engineCapacity}</h3>
                  <button
                    onClick={() => setSubmited(true)}
                    className='carSelectorBtn'
                  >
                    Select
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default CarDetails;
