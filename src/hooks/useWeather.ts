import { useState, useEffect } from 'react';
import { WeatherData, ForecastData } from '../types/weather';
import { fetchWeather, fetchForecast } from '../utils/api';

export const useWeather = (lat: number | null, lon: number | null) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (lat === null || lon === null) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [weatherData, forecastData] = await Promise.all([
          fetchWeather(lat, lon),
          fetchForecast(lat, lon)
        ]);
        
        setWeather(weatherData);
        setForecast(forecastData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lat, lon]);

  return { weather, forecast, loading, error };
};