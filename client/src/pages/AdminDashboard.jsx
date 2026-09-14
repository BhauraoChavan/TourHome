import { useEffect, useState } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await api.get('/admin/dashboard');
        setStats(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load admin dashboard');
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        {error && <p className="mb-6 rounded bg-red-50 p-4 text-red-700">{error}</p>}
        {stats && (
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow">
              <p className="text-gray-500">Users</p>
              <p className="text-3xl font-bold">{stats.users}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <p className="text-gray-500">Listings</p>
              <p className="text-3xl font-bold">{stats.listings}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
              <p className="text-gray-500">Bookings</p>
              <p className="text-3xl font-bold">{stats.bookings}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
