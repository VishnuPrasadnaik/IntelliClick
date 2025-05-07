import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Home.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  debounceTime?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, debounceTime = 300 }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }

    timerRef.current = setTimeout(() => {
      onSearch(query);
      // In a real app, you would fetch suggestions from an API here
      setSuggestions([`${query} City`, `${query} Town`, `${query} Village`]);
    }, debounceTime);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [query, debounceTime, onSearch]);

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
    inputRef.current?.focus();
  };

  return (
    <div className={styles.searchContainer}>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder="Search for a city..."
        className={styles.searchInput}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={styles.suggestionItem}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;