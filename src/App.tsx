import React, { useState } from 'react';
import { Library } from 'lucide-react';
import SearchBar from './components/SearchBar';
import BookGrid from './components/BookGrid';
import BookModal from './components/BookModal';
import { useBookSearch } from './hooks/useBookSearch';
import { Book, SearchFilters } from './types/Book';

function App() {
  // Search state
  const [filters, setFilters] = useState<SearchFilters>({
    title: '',
    author: '',
    year: '',
    subject: '',
  });

  // Modal state
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search hook
  const { books, isLoading, error, totalResults, searchBooks, clearResults } = useBookSearch();

  // Handlers
  const handleSearch = () => {
    searchBooks(filters);
  };

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    // Clear results when filters change significantly
    if (newFilters.title !== filters.title) {
      clearResults();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center">
            <Library className="w-8 h-8 text-indigo-600 mr-3" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Book Finder
            </h1>
          </div>
          <p className="text-center text-gray-600 mt-2 text-lg">
            Discover your next great read from millions of books
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <SearchBar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onSearch={handleSearch}
          isLoading={isLoading}
        />

        {/* Results Summary */}
        {(books.length > 0 || error) && (
          <div className="mb-6">
            {error ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-700 font-medium">⚠️ {error}</p>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <p className="text-emerald-700 font-medium">
                  ✨ Found {books.length} books {totalResults > books.length && `(showing first ${books.length} of ${totalResults.toLocaleString()} total results)`}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Books Grid */}
        <BookGrid
          books={books}
          onBookClick={handleBookClick}
          isLoading={isLoading}
        />

        {/* Empty State for Initial Load */}
        {!isLoading && books.length === 0 && !error && (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Library className="w-16 h-16 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Welcome to Book Finder</h2>
            <p className="text-gray-500 text-lg max-w-md mx-auto leading-relaxed">
              Start your literary journey by searching for books by title, author, or subject. 
              Discover new worlds of knowledge and imagination.
            </p>
          </div>
        )}
      </main>

      {/* Book Modal */}
      <BookModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;