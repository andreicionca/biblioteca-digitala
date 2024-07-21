import { useState, useEffect } from "react";
import { getBooks } from "../services/books";

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksData = await getBooks();
      setBooks(booksData);
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Cele mai noi cărți</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book.id} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{book.carte}</h2>
            <p className="text-gray-600">Format: {book.format}</p>
            <a
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Descarcă
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
