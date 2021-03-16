import React, {useEffect, useState} from 'react';

import './CarSelector.css';

const CarSelector = () => {
  const [make, setMake] = useState([]);
  const [model, setModel] = useState([]);
  const [makeError, setMakeError] = useState(false);
  const [modelError, setModelError] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/api/makes')
      .then((response) => response.json())
      .then((data) => {
        setMake(data);
      });
  }, []);

  const makeSelected = (e) => {
    const currentValue = e.currentTarget.value.replace(/^"(.*)"$/, '$1');
    fetch(`http://localhost:8080/api/models?make=${currentValue}`)
      .then((response) => response.json())
      .then((data) => {
        setModel(data);
        if (data.length === 0) {
          setMakeError(true);
        } else {
          setMakeError(false);
          setMake([currentValue]);
        }
      });
  };

  const modelSelected = (e) => {
    const currentValue = e.currentTarget.value.replace(/^"(.*)"$/, '$1');
    const currentMake = make[0].replace(/^"(.*)"$/, '$1');
    fetch(
      `http://localhost:8080/api/vehicles?make=${currentMake}&model=${currentValue}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          setModelError(true);
        } else {
          setModelError(false);
          setBtnDisabled(true);
          setModel([currentValue]);
        }
      });
  };

  return (
    <div className='formContainer'>
      <h1>Car Insurance Form</h1>
      <form action={`/details/${make}/${model}`}>
        <label>Enter Your Name:</label>
        <br />
        <input className='customFields' placeholder='Enter your name'></input>
        <label>Enter Your Email:</label>
        <br />
        <input className='customFields' placeholder='Enter your email'></input>
        <label htmlFor='cars'>Select a Maker:</label>
        <br />
        <select
          className='customFields'
          onChange={(e) => {
            makeSelected(e);
          }}
        >
          {make.map((val, key) => {
            return (
              <option key={key} value={val}>
                {val}
              </option>
            );
          })}
        </select>
        <br />
        {makeError && (
          <h5 className='errorMessage'>
            Insurance For this Company Will be Available Soon<sup>*</sup>
          </h5>
        )}
        {model.length !== 0 && (
          <div>
            <label htmlFor='model'>Select a Model:</label>
            <br />
            <select
              className='customFields'
              onChange={(e) => {
                modelSelected(e);
              }}
            >
              {model.map((val, key) => {
                return (
                  <option key={key} value={val}>
                    {val}
                  </option>
                );
              })}
            </select>
          </div>
        )}
        {modelError && (
          <h5 className='errorMessage'>
            Insurance For this Model Will be Available Soon<sup>*</sup>
          </h5>
        )}
        <br />
        <input
          className='carSelectorBtn'
          disabled={btnDisabled ? false : true}
          type='submit'
          value='Next'
        ></input>
      </form>
    </div>
  );
};

export default CarSelector;
