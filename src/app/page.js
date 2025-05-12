'use client';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.scss';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { fetchPapers } from '../services/api';
import SearchFilter from '../components/SearchFilter';
import Sort from '../components/Sort';

export default function Home() {
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ searchTerm: '', searchField: 'select category', sortField: 'default', sortOrder: 'default' });
  const papersPerPage = 9;

  useEffect(() => {
    const loadPapers = async () => {
      setLoading(true);
      try {
        const data = await fetchPapers(filters);
        setPapers(data);
      } catch (err) {
        setError('Failed to fetch papers');
      } finally {
        setLoading(false);
      }
    };
    loadPapers();
  }, [filters]);

  const handleSearch = ({ searchTerm, searchField }) => {
    setFilters((prev) => ({ ...prev, searchTerm, searchField }));
    setCurrentPage(1);
  };

  const handleSort = ({ sortField, sortOrder }) => {
    setFilters((prev) => ({ ...prev, sortField, sortOrder }));
    setCurrentPage(1);
  };

  const totalPapers = papers.length;
  const startIndex = (currentPage - 1) * papersPerPage;
  const currentPapers = papers?.slice(startIndex, startIndex + papersPerPage);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Research Papers Platform</h1>
      <div className={styles.filltertab}>
        <SearchFilter onSearch={handleSearch} />
        <Sort onSort={handleSort} />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.cardGrid}>
        {loading
          ? Array(9)
              .fill()
              .map((_, i) => <Skeleton key={i} height={200} width={300} />)
          : currentPapers?.map((paper) => <Card key={paper.id} paper={paper} circleBgColor={"red"}/>)}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPapers={totalPapers}
        papersPerPage={papersPerPage}
        onPageChange={setCurrentPage}
      />
    </main>
  );
}
