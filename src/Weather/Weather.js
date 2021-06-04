import { useState } from 'react';
import RadioButton from './RadioButton/RadioButton';
import WeatherDisplay from './WeatherDisplay/WeatherDisplay';
import './Weather.css';

function Weather() {
  const [zip, setZip] = useState('94110');
  const [unit, setUnit] = useState('metric');
  const [data, setData] = useState(null);
  // --------------------------------------
  async function fetchWeather() {
    // fetch weather
    const apikey = process.env.REACT_APP_WEATHER_API_KEY;
    const path = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apikey}&units=${unit}`;
    const res = await fetch(path);
    const json = await res.json();
    const { cod, message } = json;
    if (cod !== 200) {
      setData({ cod, message });
      return;
    }
    const { temp } = json.main;
    const feelsLike = json.main.feels_like;
    const { description } = json.weather[0];
    setData({
      cod, message, temp, feelsLike, description,
    });
  }
  // --------------------------------------
  return (
    <div className="Weather">
      {data && <WeatherDisplay {...data} />}
      <form onSubmit={(e) => {
        e.preventDefault();
        fetchWeather();
      }}
      >
        <div>
          <input
            type="number"
            placeholder="Enter Zip Code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
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
      </form>
    </div>
  );
}

export default Weather;
