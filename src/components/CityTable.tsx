import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { City } from '../types/city';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';
import styles from '../styles/Home.module.css';

interface CityTableProps {
  cities: City[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  onSearch: (query: string) => void;
}

const CityTable: React.FC<CityTableProps> = ({ 
  cities, 
  loading, 
  hasMore, 
  loadMore, 
  onSearch 
}) => {
  const router = useRouter();
  const tableRef = useRef<HTMLDivElement>(null);
  const [sortConfig, setSortConfig] = useState<{ key: keyof City; direction: 'asc' | 'desc' } | null>(null);
  const [filteredCities, setFilteredCities] = useState<City[]>(cities);

  useEffect(() => {
    setFilteredCities(cities);
  }, [cities]);

  const handleSort = (key: keyof City) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    setFilteredCities(prevCities => {
      return [...prevCities].sort((a, b) => {
        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
        return 0;
      });
    });
  };

  const handleScroll = () => {
    if (!tableRef.current || loading || !hasMore) return;
    
    const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
    if (scrollHeight - (scrollTop + clientHeight) < 50) {
      loadMore();
    }
  };

  const navigateToWeather = (city: City, newTab: boolean = false) => {
    const path = `/weather/${city.geoname_id}?lat=${city.coordinates.lat}&lon=${city.coordinates.lon}`;
    
    if (newTab) {
      window.open(path, '_blank');
    } else {
      router.push(path);
    }
  };

  return (
    <div className={styles.container}>
      <SearchBar onSearch={onSearch} />
      
      <div 
        ref={tableRef} 
        className={styles.tableContainer}
        onScroll={handleScroll}
      >
        <table className={styles.cityTable}>
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>
                City {sortConfig?.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('cou_name_en')}>
                Country {sortConfig?.key === 'cou_name_en' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('timezone')}>
                Timezone {sortConfig?.key === 'timezone' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('population')}>
                Population {sortConfig?.key === 'population' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCities.map(city => (
              <tr key={city.geoname_id}>
                <td 
                  onClick={() => navigateToWeather(city)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    navigateToWeather(city, true);
                  }}
                  className={styles.cityLink}
                >
                  {city.name}
                </td>
                <td>{city.cou_name_en}</td>
                <td>{city.timezone}</td>
                <td>{city.population.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {loading && <LoadingSpinner />}
        {!loading && !hasMore && <div className={styles.endMessage}>No more cities to load</div>}
      </div>
    </div>
  );
};

export default CityTable;