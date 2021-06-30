import { fetchWeather, fetchForcast } from '../utils';

export const GET_CURRENT_WEATHER = 'GET_CURRENT_DATA';
export const GET_FORCAST_WEATHER = 'GET_FORCAST_WEATHER';
export const GET_DAILY_FORCAST = 'GET_DAILY_FORCAST';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const SET_ZIP = 'SET_ZIP';
export const SET_UNIT = 'SET_UNIT';

export const clearSearch = () => ({
  type: CLEAR_SEARCH,
  payload: { },
});
export const setZip = (zip) => ({
  type: SET_ZIP,
  payload: { zip },
});
export const setUnit = (unit) => ({
  type: SET_UNIT,
  payload: { unit },
});

export const getCurrentWeather = (zip, unit) => (dispatch) => {
  fetchWeather(zip, unit)
    .then((json) => {
      dispatch({
        // return a function instead of obj
        type: GET_CURRENT_WEATHER,
        payload: { json },
      });
    })
    .catch((err) => console.error(err));
};

export const getForcastWeather = (lat, lon, unit) => (dispatch) => {
  fetchForcast(lat, lon, unit)
    .then((json) => {
      dispatch({
        // return a function instead of obj
        type: GET_FORCAST_WEATHER,
        payload: { json },
      });
    })
    .catch((err) => console.error(err));
};
