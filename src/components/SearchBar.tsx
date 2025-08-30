import React from 'react';
import { Search, Calendar, User, Tag } from 'lucide-react';
import { SearchFilters } from '../types/Book';

interface SearchBarProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  filters,
  onFiltersChange,
  onSearch,
  isLoading,
}) => {
  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    onFiltersChange({ ...filters, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for books by title..."
            value={filters.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Filter Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Author Filter */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Author name"
              value={filters.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm"
            />
          </div>

          {/* Year Filter */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="number"
              placeholder="Publication year"
              value={filters.year}
              onChange={(e) => handleInputChange('year', e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm"
              min="1000"
              max="2025"
            />
          </div>

          {/* Subject Filter */}
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Subject/Genre"
              value={filters.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-gray-50/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm"
            />
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          disabled={isLoading || !filters.title.trim()}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Searching...
            </div>
          ) : (
            'Search Books'
          )}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;