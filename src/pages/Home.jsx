import { useState, useEffect, useCallback, useRef } from "react";
import { getBooksByDate } from "../services/books";
import Book from "../components/common/Book";
import '../index.css';

function Home() {
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
      const { books: newBooks, totalCount } = await getBooksByDate(pageRef.current);
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
  }, [hasMore, books.length]);

  useEffect(() => {
    fetchBooks();
  }, []); // Empty dependency array to run only once on mount

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
      <h1 className="pt-2 text-3xl md:text-6xl font-bold mb-4 text-light-3 text-center">
        Bun venit la <span className="relative inline-block mx-2">
          <span className="gradient-text blur-effect">testformieffesct</span>
          <span className="clear-text">biblioteca ta</span>
        </span>digitală!
      </h1>
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-light-2 text-center">Descoperă un univers de cunoștințe și aventuri la un click distanță. </h1>
      <p className="text-lg md:text-xl lg:text-2xl text-light-1 text-center mb-8">
        Aici vei găsi peste 20 000 de cărți în format electronic, gata să fie explorate. Fie că ești pasionat de ficțiune, non-ficțiune, 
        știință sau artă, avem ceva pentru fiecare.
      </p>
      <div>
        {books.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </div>
      {loading && <p className="text-center">Încărcare...</p>}
      {!hasMore && <p className="text-center">Toate cărțile ({totalCount}) au fost încărcate.</p>}
    </div>
  );
}

export default Home;
