import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    verifyEmail();
  }, [token]);

  const verifyEmail = async () => {
    try {
      const response = await api.get(`/auth/verify-email/${token}`);
      setStatus('success');
      setMessage(response.data.message);
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Verification failed');
    }
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
        {status === 'success' ? (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Email Verified!</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <Link
              to="/login"
              className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
            >
              Go to Login
            </Link>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Verification Failed</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <Link
              to="/"
              className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
            >
              Go to Home
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;