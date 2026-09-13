import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import ListingGrid from '../components/ListingGrid';
import FilterPanel from '../components/FilterPanel';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Listings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    country: searchParams.get('country') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    search: searchParams.get('search') || ''
  });

  useEffect(() => {
    fetchListings();
  }, [searchParams]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      params.append('page', searchParams.get('page') || '1');
      
      const response = await api.get(`/listings?${params.toString()}`);
      setListings(response.data.data.listings);
      setPagination(response.data.data.pagination);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch listings');
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (newFilters) => {
    const params = new URLSearchParams();
    Object.entries({ ...filters, ...newFilters }).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    setSearchParams(params);
  };

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    setSearchParams(params);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Browse Listings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <FilterPanel onFilter={handleFilter} initialFilters={filters} />
        </div>
        
        <div className="lg:col-span-3">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <>
              <ListingGrid listings={listings} />
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Listings;