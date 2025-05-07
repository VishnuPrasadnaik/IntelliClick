import { useState, useCallback } from 'react';
import Head from 'next/head';
import CityTable from '../components/CityTable';
import { useCities } from '../hooks/useCities';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { cities, loading, error, hasMore, loadCities } = useCities(searchQuery);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadCities(cities.length);
    }
  }, [loading, hasMore, loadCities, cities.length]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Weather Forecast App</title>
        <meta name="description" content="Find weather forecasts for cities worldwide" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Weather Forecast</h1>
        
        {error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <CityTable 
            cities={cities} 
            loading={loading} 
            hasMore={hasMore} 
            loadMore={handleLoadMore}
            onSearch={handleSearch}
          />
        )}
      </main>
    </div>
  );
}