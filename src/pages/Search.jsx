import { useState, useEffect, useCallback } from 'react'; // Eliminat useRef
import { getBooksByDate, searchBooks } from '../services/books';
import Book from '../components/common/Book';
import '../index.css';

const replaceDiacritics = (str) => {
  return str
    .replace(/ă|â/g, 'a')
    .replace(/î/g, 'i')
    .replace(/ș/g, 's')
    .replace(/ț/g, 't')
    .replace(/Ă|Â/g, 'A')
    .replace(/Î/g, 'I')
    .replace(/Ș/g, 'S')
    .replace(/Ț/g, 'T');
};

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayTerm, setDisplayTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const fetchBooks = useCallback(async (query) => {
    setLoading(true);
    try {
      const data = query ? await searchBooks(query) : await getBooksByDate(1, 10);
      setBooks(data.books || data);
      setTotalCount(data.totalCount || data.length);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (searchTerm.length >= 3) {
      fetchBooks(replaceDiacritics(searchTerm));
    } else if (searchTerm.length === 0) {
      fetchBooks();
    }
  }, [searchTerm, fetchBooks]);

  const handleInputChange = (e) => {
    const value = replaceDiacritics(e.target.value);
    setDisplayTerm(e.target.value);
    if (value.length >= 3 || value.length === 0) {
      setSearchTerm(value);
    }
  };

  return (
    <div className="pb-16 overflow-x-hidden">
      <div className="flex justify-center my-4  pb-4 md:pb-8">
        <input
          type="text"
          placeholder="Caută cărți, autori..."
          value={displayTerm}
          onChange={handleInputChange}
          className="border border-gray-300 rounded p-2 w-full max-w-lg focus:outline-none focus:ring focus:border-blue-300 text-dark-2"
        />
      </div>
      {searchTerm.length >= 3 && (
        <div className=" mb-4 md:text-center">
          <h1 className='text-light-3 text-lg md:text-3xl'>Rezultate</h1>
          <p>{totalCount} rezultate pentru &quot;{searchTerm}&quot;</p>
        </div>
      )}
      {loading ? (
        <p className="text-center">Încărcare...</p>
      ) : (
        <div>
          {books.length > 0 ? (
            books.map((book) => (
              <Book key={book.id} book={book} />
            ))
          ) : (
            searchTerm.length >= 3 && (
              <div className="text-center my-4">
                <p className="text-xl font-bold">Nu am putut găsi nimic pentru &quot;{searchTerm}&quot;</p>
                <p className='pt-4'>Încercați din nou folosind alte cuvinte cheie, sau asigurați-vă că nu ați omis nicio literă.</p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
