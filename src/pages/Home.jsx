import { useState, useEffect } from "react";
import { getBooks } from "../services/books";
import Book from "../components/common/Book";
import '../index.css';

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksData = await getBooks();
      console.log("Books data:", booksData); // Log data
      setBooks(booksData);
    };

    fetchBooks();
  }, []);

  console.log("Rendered books:", books); // Log books state

  return (
    <div className="pb-16 overflow-x-hidden" >
      <h1 className="text-2xl md:text-4xl font-bold mb-8 text-light-2 text-center">
        Pe acest site ai acces la peste 
        <span className="relative inline-block mx-2">
          <span className="gradient-text blur-effect">somerandomtextvoreffect</span>
          <span className="clear-text">22 000 de cărți</span>
        </span> 
        în format electronic
      </h1>
      <div>
        {books.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default Home;
