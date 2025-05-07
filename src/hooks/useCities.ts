import { useState, useEffect } from 'react';
import { City, CitiesApiResponse } from '../types/city';
import { fetchCities } from '../utils/api';

export const useCities = (query: string = '', limit: number = 20) => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadCities = async (offset: number = 0, reset: boolean = false) => {
    setLoading(true);
    setError(null);
    
    try {
      const data: CitiesApiResponse = await fetchCities(query, limit, offset);
      setCities(prev => reset ? data.results : [...prev, ...data.results]);
      setHasMore(data.results.length === limit);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCities(0, true);
  }, [query]);

  return { cities, loading, error, hasMore, loadCities };
};