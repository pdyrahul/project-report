import axios from 'axios';
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchPapers = async (filters = {}) => {
  try {
    const { searchTerm, searchField, sortField, sortOrder } = filters;
    const queryParams = new URLSearchParams();
    if (searchTerm && searchField !== 'select category') {
      if (searchField === 'title') queryParams.append('papertitle_contains', searchTerm);
      else if (searchField === 'author') queryParams.append('coauthors_contains', searchTerm);
    }

    let url =`${API_URL}/acceptedpapers`;
    const queryString = queryParams.toString();
    if (queryString) url += `?${queryString}`;
    if (sortField && sortOrder && sortField !== 'default' && sortOrder !== 'default') {
      const sortParam = `_sort=${sortField}:${sortOrder.toUpperCase()}`;
      url += queryString ? `&${sortParam}` : `?${sortParam}`;
    }
    const response = await axios.get(url);
    return Array.isArray(response.data) ? response.data : [];

  } catch (error) {
    console.error("Error fetching papers:", error);
    throw error;
  }
};
export const fetchPaperDetail= async (id) => {
  try {
    const response = await axios.get(`${API_URL}/acceptedpapers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching paper details:", error);
    throw error;
  }
};