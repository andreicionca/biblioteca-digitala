import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../services/books"; // Actualizăm importul

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 text-light-3">Categorii</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">{category}</h2>
            <Link to={`/categories/${category}`} className="text-brand-1 hover:text-brand-2">
              Vezi cărțile
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
