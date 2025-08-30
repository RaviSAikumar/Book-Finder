import React, { useEffect } from 'react';
import { X, Calendar, User, Tag, BookOpen } from 'lucide-react';
import { Book } from '../types/Book';

interface BookModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookModal: React.FC<BookModalProps> = ({ book, isOpen, onClose }) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !book) return null;

  const coverUrl = book.cover_i 
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : null;

  const authors = book.author_name?.join(', ') || 'Unknown Author';
  const subjects = book.subject?.slice(0, 8) || [];
  const publishers = book.publisher?.slice(0, 3) || [];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <BookOpen className="w-6 h-6 mr-3 text-indigo-600" />
            Book Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Book Cover */}
            <div className="flex-shrink-0">
              <div className="w-64 aspect-[3/4] mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-100 to-gray-200">
                {coverUrl ? (
                  <img
                    src={coverUrl}
                    alt={`Cover of ${book.title}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
                    <div className="text-center p-6">
                      <div className="w-20 h-20 bg-indigo-200 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <span className="text-3xl">📚</span>
                      </div>
                      <p className="text-gray-600 font-medium">No Cover Available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Book Information */}
            <div className="flex-1 space-y-6">
              {/* Title */}
              <div>
                <h1 className="text-3xl font-bold text-gray-800 leading-tight mb-2">
                  {book.title}
                </h1>
              </div>

              {/* Author(s) */}
              <div className="flex items-start space-x-3">
                <User className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-700 mb-1">Author(s)</p>
                  <p className="text-gray-600">{authors}</p>
                </div>
              </div>

              {/* Publication Year */}
              {book.first_publish_year && (
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-700 mb-1">First Published</p>
                    <p className="text-gray-600">{book.first_publish_year}</p>
                  </div>
                </div>
              )}

              {/* Publishers */}
              {publishers.length > 0 && (
                <div className="flex items-start space-x-3">
                  <BookOpen className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-700 mb-1">Publisher(s)</p>
                    <p className="text-gray-600">{publishers.join(', ')}</p>
                  </div>
                </div>
              )}

              {/* Subjects */}
              {subjects.length > 0 && (
                <div className="flex items-start space-x-3">
                  <Tag className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-700 mb-2">Subjects</p>
                    <div className="flex flex-wrap gap-2">
                      {subjects.map((subject, index) => (
                        <span
                          key={index}
                          className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl p-4 border border-gray-100">
                <h4 className="font-semibold text-gray-700 mb-2">Additional Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {book.language && (
                    <div>
                      <span className="font-medium text-gray-600">Languages:</span>
                      <span className="ml-2 text-gray-500">
                        {book.language.slice(0, 3).join(', ')}
                      </span>
                    </div>
                  )}
                  {book.publish_year && (
                    <div>
                      <span className="font-medium text-gray-600">Editions:</span>
                      <span className="ml-2 text-gray-500">
                        {book.publish_year.length} different years
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;