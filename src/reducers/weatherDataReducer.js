import { defaultState } from '../utils';
import {
  SET_UNIT, SET_ZIP, GET_CURRENT_WEATHER, CLEAR_SEARCH, GET_FORCAST_WEATHER,
} from '../actions';

const weatherDataReducer = (state = defaultState(), action) => {
  const {
    zip, unit, data, forcastDays, coord,
  } = state;
  switch (action.type) {
    case GET_CURRENT_WEATHER: {
      const { json } = action.payload;
      const { cod, message } = json;
      if (cod !== 200) {
        const tempData = { cod, message };
        return { ...state, data: tempData };
      }
      const { lat, lon } = json.coord;
      const { temp, humidity } = json.main;
      const feelsLike = json.main.feels_like;
      const { description, icon } = json.weather[0];
      const { name } = json;
      return {
        ...state,
        data: {
          cod, message, temp, feelsLike, description, humidity, icon, name,
        },
        coord: { lat, lon },
      };
    }
    case GET_FORCAST_WEATHER: {
      const { json } = action.payload;
      const { cod, message } = json;
      const tempForcast = json.daily;
      const dailyForcast = [];
      tempForcast.forEach((entry) => {
        const { icon } = entry.weather[0];
        const { day, min, max } = entry.temp;
        const { dt } = entry;
        dailyForcast.push({
          icon, day, min, max, dt,
        });
      });
      return { ...state, forcastDays: dailyForcast };
    }
    case CLEAR_SEARCH:
      return { ...state, data: null, forcastDays: null };
    case SET_UNIT:
      return { ...state, unit: action.payload.unit };
    case SET_ZIP:
      return { ...state, zip: action.payload.zip };
    default:
      return state;
  }
};

export default weatherDataReducer;
