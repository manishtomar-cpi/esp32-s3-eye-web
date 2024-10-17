// components/SearchBar.jsx
import React, { useState } from 'react';

function SearchBar({ onSearch, onReset }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');

  const handleSearch = () => {
    onSearch({ term: searchTerm, date: searchDate });
  };

  const handleReset = () => {
    setSearchTerm('');
    setSearchDate('');
    onReset();
  };

  return (
    <div className="mb-6 flex items-center space-x-4">
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="datetime-local"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Search
      </button>
      <button
        onClick={handleReset}
        className="px-4 py-2 bg-gray-500 text-white rounded"
      >
        Reset
      </button>
    </div>
  );
}

export default SearchBar;
