import { combineReducers } from 'redux';

import weatherDataReducer from './weatherDataReducer';

export default combineReducers({
  weatherData: weatherDataReducer,
});
