export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  export interface MainWeatherData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  }
  
  export interface Wind {
    speed: number;
    deg: number;
    gust?: number;
  }
  
  export interface Clouds {
    all: number;
  }
  
  export interface Sys {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
  }
  
  export interface WeatherData {
    coord: {
      lon: number;
      lat: number;
    };
    weather: Weather[];
    base: string;
    main: MainWeatherData;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
  }
  
  export interface ForecastItem {
    dt: number;
    main: MainWeatherData;
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }
  
  export interface ForecastData {
    cod: string;
    message: number;
    cnt: number;
    list: ForecastItem[];
    city: {
      id: number;
      name: string;
      coord: {
        lat: number;
        lon: number;
      };
      country: string;
      population: number;
      timezone: number;
      sunrise: number;
      sunset: number;
    };
  }