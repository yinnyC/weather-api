export const GET_CURRENT_WEATHER = 'GET_CURRENT_DATA';
export const GET_HOURLY_FORCAST = 'GET_HOURLY_FORCAST';
export const GET_DAILY_FORCAST = 'GET_DAILY_FORCAST';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const SET_ZIP = 'SET_ZIP';
export const SET_UNIT = 'SET_UNIT';

export const getCurrentWeather = () => ({
  type: GET_CURRENT_WEATHER,
  payload: { },
});
export const getHourlyForcast = () => ({
  type: GET_HOURLY_FORCAST,
  payload: { },
});
export const getDailyForcast = () => ({
  type: GET_DAILY_FORCAST,
  payload: { },
});
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
