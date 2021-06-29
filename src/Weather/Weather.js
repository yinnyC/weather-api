import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RadioButton from './RadioButton/RadioButton';
import WeatherDisplay from './WeatherDisplay/WeatherDisplay';
import { setZip, setUnit } from '../actions';
import './Weather.css';

function Weather() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.weatherData);
  const { zip, unit } = form;
  const [data, setData] = useState(null);
  const apikey = process.env.REACT_APP_WEATHER_API_KEY;
  // --------------------------------------
  async function fetchWeather(path) {
    // fetch weather
    const res = await fetch(path);
    const json = await res.json();
    const { cod, message } = json;
    if (cod !== 200) {
      setData({ cod, message });
      return;
    }
    const { temp, humidity } = json.main;
    const feelsLike = json.main.feels_like;
    const { description, icon } = json.weather[0];
    setData({
      cod, message, temp, feelsLike, description, humidity, icon,
    });
  }
  function fetchWeatherByZip() {
    const path = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apikey}&units=${unit}`;
    fetchWeather(path);
  }

  function fetchWeatherByGeo() {
    // get geo coords
    const options = {
      enableHighAccuracy: true,
      timeout: 500,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      // make path
      const path = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=${unit}`;
      fetchWeather(path);
    }, (err) => {
      console.warn(err.message);
    }, options);
  }
  // --------------------------------------
  return (
    <div className="Weather">
      {data ? <WeatherDisplay {...data} /> : <h2 className="Greeting">How&apos;s the weather?</h2>}
      <form onSubmit={(e) => {
        e.preventDefault();
        fetchWeatherByZip();
      }}
      >
        <div className="inputBar">
          <input
            type="number"
            placeholder="Enter Zip Code"
            value={zip}
            onChange={(e) => {
              dispatch(setZip(e.target.value));
              if (e.target.value === '') {
                setData(null);
              }
            }}
          />
          <button type="submit">Submit</button>
        </div>
        <select
          value={unit}
          onChange={(e) => dispatch(setUnit(e.target.value))}
        >
          <option value="metric">metric</option>
          <option value="imperial">imperial</option>
          <option value="standard">standard</option>
        </select>
      </form>
      <button
        className="getByGeo"
        type="button"
        onClick={fetchWeatherByGeo}
      >
        Get Weather By Location
      </button>
    </div>
  );
}

export default Weather;
