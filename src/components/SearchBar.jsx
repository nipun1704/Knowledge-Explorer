import { useState } from 'react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any historical topic or event..."
          className="w-full px-4 py-3 pr-12 text-gray-800 bg-white border-2 border-gray-200 
            rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 
            bg-indigo-600 text-white rounded-md hover:bg-indigo-700 
            disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            'Search'
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBar; 