import { WeatherData, ForecastData } from '../types/weather';
import WeatherIcon from './WeatherIcon';
import styles from '../styles/Home.module.css';

interface WeatherCardProps {
  weather: WeatherData;
  forecast: ForecastData | null;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, forecast }) => {
  const getBackgroundClass = () => {
    const mainWeather = weather.weather[0].main.toLowerCase();
    switch (mainWeather) {
      case 'clear':
        return styles.clearBg;
      case 'clouds':
        return styles.cloudyBg;
      case 'rain':
      case 'drizzle':
        return styles.rainyBg;
      case 'thunderstorm':
        return styles.stormBg;
      case 'snow':
        return styles.snowBg;
      default:
        return styles.defaultBg;
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`${styles.weatherCard} ${getBackgroundClass()}`}>
      <div className={styles.weatherHeader}>
        <h2>{weather.name}, {weather.sys.country}</h2>
        <p>{formatDate(weather.dt)}</p>
      </div>
      
      <div className={styles.currentWeather}>
        <div className={styles.weatherMain}>
          <WeatherIcon code={weather.weather[0].icon} />
          <div className={styles.temperature}>
            <span>{Math.round(weather.main.temp)}°C</span>
            <span>{weather.weather[0].description}</span>
          </div>
        </div>
        
        <div className={styles.weatherDetails}>
          <div>
            <span>Feels like: {Math.round(weather.main.feels_like)}°C</span>
            <span>Humidity: {weather.main.humidity}%</span>
          </div>
          <div>
            <span>Wind: {weather.wind.speed} m/s</span>
            <span>Pressure: {weather.main.pressure} hPa</span>
          </div>
          <div>
            <span>Sunrise: {formatTime(weather.sys.sunrise)}</span>
            <span>Sunset: {formatTime(weather.sys.sunset)}</span>
          </div>
        </div>
      </div>
      
      {forecast && (
        <div className={styles.forecast}>
          <h3>5-Day Forecast</h3>
          <div className={styles.forecastItems}>
            {forecast.list.filter((_, index) => index % 8 === 0).slice(0, 5).map(item => (
              <div key={item.dt} className={styles.forecastItem}>
                <p>{new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                <WeatherIcon code={item.weather[0].icon} small />
                <p>
                  {Math.round(item.main.temp_max)}° / {Math.round(item.main.temp_min)}°
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;