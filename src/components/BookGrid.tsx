import React from 'react';
import BookCard from './BookCard';
import { Book } from '../types/Book';

interface BookGridProps {
  books: Book[];
  onBookClick: (book: Book) => void;
  isLoading: boolean;
}

const BookGrid: React.FC<BookGridProps> = ({ books, onBookClick, isLoading }) => {
  // Loading skeleton
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden animate-pulse">
            <div className="aspect-[3/4] bg-gray-200"></div>
            <div className="p-5 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">📚</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No books found</h3>
        <p className="text-gray-500">Try adjusting your search terms or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.key}
          book={book}
          onClick={onBookClick}
        />
      ))}
    </div>
  );
};

export default BookGrid;