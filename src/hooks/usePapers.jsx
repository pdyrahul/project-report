"use client"
import { useState, useEffect, useCallback } from 'react';
import { fetchPapers } from '../services/api';

const usePapers = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPapers = useCallback(async () => {
    try {
      const data = await fetchPapers();
      setPapers(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch papers');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPapers();
  }, [getPapers]);

  return { papers, loading, error };
};

export default usePapers;
