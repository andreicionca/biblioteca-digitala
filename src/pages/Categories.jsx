import { useState, useEffect } from "react";
import { getBooks } from "../services/books";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const books = await getBooks();
      const categories = [...new Set(books.map((book) => book.format))]; // Extrage și filtrează categoriile unice
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Categorii</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{category}</h2>
            {/* Poți adăuga un link sau alte detalii aici */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
