import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by location, country, or keyword..."
        className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
      <button
        type="submit"
        className="bg-primary-600 text-white px-6 py-3 rounded-r-lg hover:bg-primary-700 transition-colors"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBar;