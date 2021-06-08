import { useState } from 'react';
import RadioButton from './RadioButton/RadioButton';
import WeatherDisplay from './WeatherDisplay/WeatherDisplay';
import './Weather.css';

function Weather() {
  const [zip, setZip] = useState('94110');
  const [unit, setUnit] = useState('metric');
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
              setZip(e.target.value);
              if (e.target.value === '') {
                setData(null);
              }
            }}
          />
          <button type="submit">Submit</button>
        </div>
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          <option value="metric">metric</option>
          <option value="imperial">imperial</option>
          <option value="standard">standard</option>
        </select>
        <div className="RadioButtons">
          <RadioButton
            label="metric"
            unit={unit}
            onChange={() => setUnit('metric')}
          />
          <RadioButton
            label="imperial"
            unit={unit}
            onChange={() => setUnit('imperial')}
          />
          <RadioButton
            label="standard"
            unit={unit}
            onChange={() => setUnit('standard')}
          />
        </div>
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
