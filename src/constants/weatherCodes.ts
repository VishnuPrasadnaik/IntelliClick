export const weatherCodeToDescription: Record<number, string> = {
    200: 'thunderstorm with light rain',
    201: 'thunderstorm with rain',
    202: 'thunderstorm with heavy rain',
    // Add all other weather codes from OpenWeatherMap
    800: 'clear sky',
    801: 'few clouds',
    802: 'scattered clouds',
    803: 'broken clouds',
    804: 'overcast clouds'
  };
  
  export const getWeatherBackground = (code: number) => {
    if (code >= 200 && code < 300) return 'thunderstorm';
    if (code >= 300 && code < 600) return 'rain';
    if (code >= 600 && code < 700) return 'snow';
    if (code >= 700 && code < 800) return 'mist';
    if (code === 800) return 'clear';
    if (code > 800) return 'clouds';
    return 'default';
  };