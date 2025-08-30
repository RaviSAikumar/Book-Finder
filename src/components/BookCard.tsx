import React from 'react';
import { Calendar, User } from 'lucide-react';
import { Book } from '../types/Book';

interface BookCardProps {
  book: Book;
  onClick: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  const coverUrl = book.cover_i 
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  const authors = book.author_name?.slice(0, 2).join(', ') || 'Unknown Author';
  const displayAuthors = book.author_name && book.author_name.length > 2 
    ? `${authors} +${book.author_name.length - 2} more`
    : authors;

  return (
    <div
      onClick={() => onClick(book)}
      className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-2xl border border-white/30 overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-2"
    >
      {/* Cover Image */}
      <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={`Cover of ${book.title}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center mb-3 mx-auto">
                <span className="text-2xl font-bold text-indigo-600">📚</span>
              </div>
              <p className="text-sm text-gray-600 font-medium">No Cover Available</p>
            </div>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Book Info */}
      <div className="p-5 space-y-3">
        <h3 className="font-bold text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200 text-lg leading-tight">
          {book.title}
        </h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <User className="w-4 h-4 mr-2 text-emerald-500" />
            <span className="truncate" title={authors}>
              {displayAuthors}
            </span>
          </div>
          
          {book.first_publish_year && (
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2 text-orange-500" />
              <span>{book.first_publish_year}</span>
            </div>
          )}
        </div>

        {/* Click Indicator */}
        <div className="pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-400 group-hover:text-indigo-500 transition-colors duration-200 font-medium">
            Click for details →
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;