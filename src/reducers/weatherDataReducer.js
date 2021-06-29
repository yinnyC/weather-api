// import {
//   GET_CURRENT_WEATHER, GET_HOURLY_FORCAST, GET_DAILY_FORCAST, CLEAR_SEARCH,
// } from '../actions';
import { defaultState } from '../utils';

import { SET_UNIT, SET_ZIP } from '../actions';

const weatherDataReducer = (state = defaultState(), action) => {
  const { zip, unit, data } = state;
  switch (action.type) {
    case SET_UNIT:
      return { ...state, unit: action.payload.unit };
    case SET_ZIP:
      return { ...state, zip: action.payload.zip };
    default:
      return state;
  }
};

export default weatherDataReducer;
