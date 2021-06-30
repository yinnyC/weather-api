import './CurrentDisplay.css';

function CurrentDisplay(props) {
  const {
    temp, feelsLike, description, cod, message, icon, humidity, name,
  } = props;
  if (cod !== 200) {
    return (
      <div className="ErrorMsg">
        <img alt="erroricon" src="https://img.icons8.com/pastel-glyph/64/000000/error--v4.png" />
        <small>{message}</small>
      </div>
    );
  }
  return (
    <div className="CurrentDisplay">
      <div className="Info">
        <h2>{name}</h2>
        <h1>{temp}</h1>
        <small>{description}</small>
        <p>{`Feels Like: ${feelsLike}`}</p>
        <p>{`Humidity: ${humidity}`}</p>
      </div>
      <img alt="icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
    </div>
  );
}

export default CurrentDisplay;
