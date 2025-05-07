import styles from '../styles/Home.module.css';

interface WeatherIconProps {
  code: string;
  small?: boolean;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ code, small = false }) => {
  const getIconPath = () => {
    const iconMap: Record<string, string> = {
      '01': 'clear',
      '02': 'partly-cloudy',
      '03': 'cloudy',
      '04': 'cloudy',
      '09': 'rain',
      '10': 'rain',
      '11': 'thunderstorm',
      '13': 'snow',
      '50': 'mist'
    };
    
    const prefix = code.slice(0, 2);
    return `/icons/${iconMap[prefix] || 'clear'}.svg`;
  };

  return (
    <img 
      src={getIconPath()} 
      alt="Weather icon" 
      className={`${styles.weatherIcon} ${small ? styles.smallIcon : ''}`}
    />
  );
};

export default WeatherIcon;