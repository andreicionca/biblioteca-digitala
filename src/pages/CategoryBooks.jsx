import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBooksByCategory } from "../services/books";
import Book from "../components/common/Book";
import '../index.css';

function CategoryBooks() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const loadingRef = useRef(false);
  const pageRef = useRef(1);

  const fetchBooks = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    setLoading(true);

    try {
      const { books: newBooks, totalCount } = await getBooksByCategory(category, pageRef.current);
      if (pageRef.current * 3 >= totalCount) {
        setHasMore(false);
      }
      setBooks(prevBooks => {
        const uniqueBooks = newBooks.filter(newBook => 
          !prevBooks.some(prevBook => prevBook.id === newBook.id)
        );
        return [...prevBooks, ...uniqueBooks];
      });
      setTotalCount(totalCount);
      if (newBooks.length === 0 || books.length + newBooks.length >= totalCount) {
        setHasMore(false);
      } else {
        pageRef.current += 1;
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [category, hasMore, books.length]);

  useEffect(() => {
    fetchBooks();
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
    <div className="pb-16 overflow-x-hidden">
      <button
        onClick={() => navigate(-1)}
        className="bg-brand-1 text-dark-2 px-4 py-2 rounded mb-4"
      >
        Înapoi la categorii
      </button>
      <h1 className="text-2xl md:text-4xl font-bold mb-8 text-light-2 text-center">
        Cărți din categoria: <br /><span className="text-light-3">{category}</span>
      </h1>
      <div>
        {books.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </div>
      {loading && <p className="text-center">Încărcare...</p>}
      {!hasMore && <p className="text-center">Toate cele  {totalCount} cărți au fost încărcate.</p>}
    </div>
  );
}

export default CategoryBooks;
