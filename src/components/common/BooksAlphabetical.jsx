import { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from 'prop-types';
import { getBooksByCategoryAndLetter, getBooksAlphabetical } from "../../services/books";
import Book from "./Book";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function BooksAlphabetical({ category }) {
  const [books, setBooks] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState("A");  // Selectăm implicit litera "A"
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const loadingRef = useRef(false);
  const pageRef = useRef(1);

  const fetchBooks = useCallback(async (reset = false) => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setLoading(true);

    try {
      let fetchedBooks;
      let count;
      if (category === 'Alfabetic') {
        const { books: newBooks, totalCount } = await getBooksAlphabetical(selectedLetter, pageRef.current);
        fetchedBooks = newBooks;
        count = totalCount;
      } else {
        const { books: newBooks, totalCount } = await getBooksByCategoryAndLetter(category, selectedLetter, pageRef.current);
        fetchedBooks = newBooks;
        count = totalCount;
      }

      setBooks(prevBooks => reset ? fetchedBooks : [...prevBooks, ...fetchedBooks]);
      setTotalCount(count);
      if (pageRef.current * 3 >= count) {
        setHasMore(false);
      }
      pageRef.current += 1;
    } catch (err) {
      setError("Error fetching books");
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [selectedLetter, category, hasMore]);

  useEffect(() => {
    fetchBooks(true);
  }, [selectedLetter, category, fetchBooks]);

  const handleScroll = useCallback(() => {
    const scrollThreshold = 1000;
    if (
      window.innerHeight + document.documentElement.scrollTop + scrollThreshold >=
        document.documentElement.offsetHeight &&
      hasMore &&
      !loadingRef.current
    ) {
      fetchBooks();
    }
  }, [hasMore, fetchBooks]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    setBooks([]); // Resetăm starea cărților
    pageRef.current = 1; // Resetăm pagina curentă
    setHasMore(true); // Resetăm starea hasMore
    setTotalCount(0); // Resetăm numărul total de rezultate
  };

  return (
    <div className="px-2 py-1 md:px-4  md:py-2">
      <div className="flex flex-wrap justify-center mb-1 md:mb-4">
        {letters.map((letter) => (
          <div
            key={letter}
            className={`border rounded-full px-2 py-1 m-1 md:px-3 md:py-1  cursor-pointer transition-all text-xxs md:text-base ${
              selectedLetter === letter ? 'bg-brand-1 text-dark-2' : 'bg-light-1 text-light-3 hover:bg-light-2'
            }`}
            onClick={() => handleLetterClick(letter)}
          >
            {letter}
          </div>
        ))}
      </div>
      <p className="text-center text-sm md:text-lg mb-2 md:mb-4">{totalCount} rezultate care încep cu litera <span className="text-brand-1 ">{selectedLetter}</span></p>
      {error && <p className="text-center text-red-500">{error}</p>}
      <div>
        {books.length > 0 ? (
          books.map((book) => (
            <Book key={book.id} book={book} />
          ))
        ) : (
          !loading && <p className="text-center">Nu există cărți pentru litera selectată.</p>
        )}
      </div>
      {loading && <p className="text-center">Încărcare...</p>}
      {!hasMore && books.length > 0 && <p className="text-center">Toate cărțile au fost încărcate.</p>}
    </div>
  );
}

BooksAlphabetical.propTypes = {
  category: PropTypes.string.isRequired,
};

export default BooksAlphabetical;
