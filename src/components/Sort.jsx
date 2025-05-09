'use client';
import { useState } from 'react';
import styles from '../styles/Sort.module.scss';
import { XCircle } from 'lucide-react';

const Sort = ({ onSort }) => {
  const [sortField, setSortField] = useState('default');
  const [sortOrder, setSortOrder] = useState('default');

  const handleSort = () => {
    if (sortField === 'default' || sortOrder === 'default') return;
    onSort({ sortField, sortOrder });
  };

  const handleClear = () => {
    setSortField('default');
    setSortOrder('default');
    onSort({ sortField: 'default', sortOrder: 'default' });
  };

  const isSortActive = sortField !== 'default' && sortOrder !== 'default';

  return (
    <div className={styles.sortContainer}>
      <select
        value={sortField}
        onChange={(e) => setSortField(e.target.value)}
        className={styles.select}
      >
        <option value="default">Select Sort Field</option>
        <option value="papertitle">Title</option>
        <option value="coauthors">Author</option>
        <option value="journal.impactfactor">Impact Factor</option>
        <option value="created_at">Published Date</option>
      </select>
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className={styles.select}
      >
        <option value="default">Select Order</option>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
      <button onClick={handleSort} className={styles.button} disabled={sortField === 'default' || sortOrder === 'default'}>
        Sort
      </button>
      {isSortActive && (
        <button onClick={handleClear} className={styles.clearButton}>
          <XCircle/>
        </button>
      )}
    </div>
  );
};

export default Sort;