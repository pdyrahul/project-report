'use client';
import { useState } from 'react';
import styles from '../styles/SearchFilter.module.scss';
import { XCircle } from 'lucide-react';

const SearchFilter = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('select category');

  const handleSearch = () => {
    if (searchField === 'select category') return;
    onSearch({ searchTerm, searchField });
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchField('select category');
    onSearch({ searchTerm: '', searchField: 'select category' });
  };

  const isFilterActive = searchField !== 'select category' || searchTerm !== '';

  return (
    <div className={styles.searchContainer}>
      <select
        value={searchField}
        onChange={(e) => setSearchField(e.target.value)}
        className={styles.select}
      >
        <option value="select category">Select Category</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
      </select>
      <input
        type="text"
        placeholder={searchField === 'select category' ? 'Select a category to search...' : `Search by ${searchField}...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.input}
      />
      <button
        onClick={handleSearch}
        className={styles.button}
        disabled={searchField === 'select category'}
      >
        Search
      </button>
      {isFilterActive && (
        <button onClick={handleClear} className={styles.clearButton}>
          <XCircle/>
        </button>
      )}
    </div>
  );
};

export default SearchFilter;