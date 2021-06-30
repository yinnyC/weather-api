const apikey = process.env.REACT_APP_WEATHER_API_KEY;

export const defaultState = () => ({
  zip: '94110',
  unit: 'metric',
  data: null,
  forcastDays: null,
  coord: {
    lon: '-122.4153',
    lat: '37.7509',
  },
});

export async function fetchWeather(zip, unit) {
  // fetch weather
  const path = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apikey}&units=${unit}`;
  const res = await fetch(path);
  const json = await res.json();
  return json;
}

export async function fetchForcast(lat, lon, unit) {
  // fetch weather
  const forcastPath = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={hourly,current,minutely,alerts}&appid=${apikey}&units=${unit}`;
  const res = await fetch(forcastPath);
  const json = await res.json();
  return json;
}
