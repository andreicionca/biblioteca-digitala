import { useState, useEffect, useCallback, useRef } from "react";
import { getBooksByDate } from "../../services/books";
import Book from "./Book";

function BooksNew() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);
  const pageRef = useRef(1);

  const fetchBooks = useCallback(async (reset = false) => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setLoading(true);

    try {
      const { books: newBooks, totalCount } = await getBooksByDate(pageRef.current, 100);
      setBooks(prevBooks => reset ? newBooks : [...prevBooks, ...newBooks]);
      if (pageRef.current * 100 >= totalCount) {
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
  }, [hasMore]);

  useEffect(() => {
    fetchBooks(true);
  }, [fetchBooks]);

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

  return (
    <div className="px-2 py-1 md:px-4  md:py-2">

      {error && <p className="text-center text-red-500">{error}</p>}
      
      <div>
        {books.length > 0 ? (
          books.map((book) => (
            <Book key={book.id} book={book} />
          ))
        ) : (
          !loading && <p className="text-center">Nu există cărți noi adăugate.</p>
        )}
      </div>
      {loading && <p className="text-center">Încărcare...</p>}
      {!hasMore && books.length > 0 && <p className="text-center">Toate cărțile noi au fost încărcate.</p>}
    </div>
  );
}

export default BooksNew;
