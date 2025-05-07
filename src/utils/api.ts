import { City, CitiesApiResponse } from '../types/city';
import { WeatherData, ForecastData } from '../types/weather';

const GEONAMES_API = process.env.NEXT_PUBLIC_GEONAMES_API;
const OPENWEATHER_API = process.env.NEXT_PUBLIC_OPENWEATHER_API;
const OPENWEATHER_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;

export const fetchCities = async (
  query: string = '',
  limit: number = 20,
  offset: number = 0
): Promise<CitiesApiResponse> => {
  const whereClause = query ? `where=search(name,"${query}")` : '';
  const url = `${GEONAMES_API}?limit=${limit}&offset=${offset}&${whereClause}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch cities');
  }
  return response.json();
};

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  const url = `${OPENWEATHER_API}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_KEY}&units=metric`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return response.json();
};

export const fetchForecast = async (lat: number, lon: number): Promise<ForecastData> => {
  const url = `${OPENWEATHER_API}/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_KEY}&units=metric`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch forecast data');
  }
  return response.json();
};