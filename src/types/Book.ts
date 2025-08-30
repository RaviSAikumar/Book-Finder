export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  isbn?: string[];
  subject?: string[];
  publisher?: string[];
  publish_year?: number[];
  language?: string[];
}

export interface SearchFilters {
  title: string;
  author: string;
  year: string;
  subject: string;
}