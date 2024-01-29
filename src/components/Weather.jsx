import React, { useEffect, useState } from 'react';
import '../components/style.css';

const rapidApiKey = import.meta.env.VITE_SECRET; // Use REACT_APP_ prefix for environment variables in Create React App
const Weather = () => {

  const [searchValue, setSearchValue] = useState('Bhavnagar');
  const [tempInfo, setTempInfo] = useState({});
  const [weatherState, setWeatherState] = useState('');

  const getWeatherInfo = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=${rapidApiKey}`;

      const res = await fetch(url);
      const data = await res.json();

      const { temp } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;

      const myWeatherInfo = {
        temp,
        weathermood,
        name,
      };

      setTempInfo(myWeatherInfo);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // You can set an error state or display a user-friendly error message here
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  useEffect(() => {
    if (tempInfo.weathermood) {
      switch (tempInfo.weathermood) {
        case 'Clouds':
          setWeatherState('wi-day-cloudy');
          break;
        case 'Rain':
          setWeatherState('wi-day-rain');
          break;
        case 'Snow':
          setWeatherState('wi-day-snow');
          break;
        case 'Thunderstrom':
          setWeatherState('wi-day-thunderstorm');
          break;
        case 'Clear':
          setWeatherState('wi-day-sunny');
          break;
        case 'Haze':
          setWeatherState('wi-day-haze');
          break;
        default:
          setWeatherState('wi-day-sunny');
          break;
      }
    }
  }, [tempInfo.weathermood]);

  return (
    <>
      <main className="container">
        <div className="search-container">
          <input
            type="search"
            id="search"
            placeholder="Search your city.."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="srch-btn" onClick={() => getWeatherInfo()}>
            Search
          </button>
        </div>
        <div className="wrapper">
          <div className="left-sec">
            <figure>
              <i className={`wi ${weatherState}`}></i>
            </figure>
            <span className="weather-mood">{tempInfo.weathermood}</span>
            <span className="city">{tempInfo.name}</span>
          </div>
          <div className="right-sec">
            <span className="temp">{tempInfo.temp}&deg;</span>
            <span className="temp-text">Temperature</span>
          </div>
        </div>
      </main>
    </>
  );
};

export default Weather;
