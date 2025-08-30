import { useState, useCallback } from 'react';
import { Book, SearchFilters } from '../types/Book';

interface SearchResponse {
  docs: Book[];
  numFound: number;
  start: number;
}

export const useBookSearch = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  const searchBooks = useCallback(async (filters: SearchFilters) => {
    if (!filters.title.trim()) {
      setError('Please enter a book title');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Build query parameters
      const params = new URLSearchParams();
      params.append('title', filters.title);
      
      if (filters.author.trim()) {
        params.append('author', filters.author);
      }
      
      if (filters.year.trim()) {
        params.append('first_publish_year', filters.year);
      }
      
      if (filters.subject.trim()) {
        params.append('subject', filters.subject);
      }

      // Limit results and specify fields
      params.append('limit', '50');
      params.append('fields', 'key,title,author_name,first_publish_year,cover_i,isbn,subject,publisher,publish_year,language');

      const response = await fetch(`https://openlibrary.org/search.json?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SearchResponse = await response.json();
      
      // Filter out books without essential information
      const validBooks = data.docs.filter(book => 
        book.title && (book.author_name || book.first_publish_year)
      );

      setBooks(validBooks);
      setTotalResults(data.numFound);
      
      if (validBooks.length === 0 && data.numFound === 0) {
        setError('No books found matching your search criteria');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search books. Please check your connection and try again.');
      setBooks([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setBooks([]);
    setError(null);
    setTotalResults(0);
  }, []);

  return {
    books,
    isLoading,
    error,
    totalResults,
    searchBooks,
    clearResults,
  };
};