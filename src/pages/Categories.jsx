import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../services/books"; // Actualizăm importul

function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/categories/${category}`);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 text-center text-light-3">Categorii</h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="border p-1 h-20 flex items-center justify-center rounded-lg shadow-md cursor-pointer bg-dark-2 md:bg-light-3"
            onClick={() => handleCategoryClick(category)}
          >
            <h2 className="text-sm md:text-2xl font-semibold mb-2 text-center">{category}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
