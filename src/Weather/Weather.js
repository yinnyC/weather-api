import { useSelector, useDispatch } from 'react-redux';
import CurrentDisplay from './CurrentDisplay/CurrentDisplay';
import ForcastDisplay from './ForcastDisplay/ForcastDisplay';
import {
  setZip, setUnit, getCurrentWeather, clearSearch, getForcastWeather,
} from '../actions';
import './Weather.css';

function Weather() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.weatherData);
  const {
    zip, unit, data, coord, forcastDays,
  } = form;
  // --------------------------------------
  function fetchWeather() {
    dispatch(getCurrentWeather(zip, unit));
    dispatch(getForcastWeather(coord.lat, coord.lon, unit));
  }
  // --------------------------------------
  return (
    <div className="Weather">
      <div className="Display">
        {data ? <CurrentDisplay {...data} /> : <h2 className="Greeting">Hi There 👋🏻 How&apos;s the weather?</h2>}
        <hr />
        {forcastDays ? <ForcastDisplay forcastDays={forcastDays} /> : <h2 className="Greeting">Enter yout Zipcode to find out</h2>}
      </div>
      <form>
        <div className="inputBar">
          <label>
            Zip Code
          </label>
          <input
            type="number"
            placeholder="Enter Zip Code"
            value={zip}
            onChange={(e) => {
              dispatch(setZip(e.target.value));
              if (e.target.value === '') {
                dispatch(clearSearch());
              }
            }}
          />
        </div>
        <div className="selectBar">
          <label>
            Unit
          </label>
          <select
            value={unit}
            onChange={(e) => dispatch(setUnit(e.target.value))}
          >
            <option value="metric">metric</option>
            <option value="imperial">imperial</option>
            <option value="standard">standard</option>
          </select>
        </div>
        <button
          id="currentWeather"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            fetchWeather();
          }}
        >
          Get Current Weather
        </button>
      </form>
    </div>
  );
}

export default Weather;
