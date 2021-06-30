import './ForcastDisplay.css';

function ForcastDisplay(props) {
  const { forcastDays } = props;
  console.log(forcastDays);
  return (
    <div className="ForcastDisplay">
      {forcastDays.map((forcast) => {
        console.log(forcast);
        const {
          icon, day, min, max, dt,
        } = forcast;
        const weekday = (new Date(dt * 1000)).toLocaleDateString('en-US', { weekday: 'long' });
        return (
          <div className="ForcastInfo">
            <h4>{weekday}</h4>
            <img alt="icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
            <div>
              <small>{`Max: ${max}`}</small>
              {' '}
              <small>{`Min: ${min}`}</small>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ForcastDisplay;
