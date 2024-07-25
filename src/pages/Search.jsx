import { useState, useEffect } from 'react';
import { searchBooks } from '../services/books';
import Book from '../components/common/Book';
import '../index.css';

const replaceDiacritics = (str) => {
  return str
    .replace(/ă|â/g, 'a')
    .replace(/î/g, 'i')
    .replace(/ș/g, 's')
    .replace(/ț/g, 't');
};

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async (query) => {
    setLoading(true);
    try {
      const data = await searchBooks(query);
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm.length >= 3) {
      fetchBooks(replaceDiacritics(searchTerm));
    } else {
      setBooks([]);
    }
  }, [searchTerm]);

  return (
    <div className="pb-16 overflow-x-hidden">
      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Caută cărți..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(replaceDiacritics(e.target.value))}
          className="border border-gray-300 rounded p-2 w-full max-w-lg"
        />
      </div>
      {searchTerm.length >= 3 && (
        <p className="text-center mb-4">{books.length} rezultate găsite</p>
      )}
      {loading ? (
        <p className="text-center">Încărcare...</p>
      ) : (
        <div>
          {books.map((book) => (
            <Book key={book.id} book={book} />
          ))}
        </div>
      )}
      {!loading && books.length === 0 && searchTerm && searchTerm.length >= 3 && (
        <p className="text-center">Nicio carte găsită pentru termenul &quot;{searchTerm}&quot;</p>
      )}
    </div>
  );
}

export default Search;
