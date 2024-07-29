import { useNavigate, useParams } from "react-router-dom";
import BooksAlphabetical from "../components/common/BooksAlphabetical";
import '../index.css';

function CategoryBooks() {
  const { category } = useParams();
  const navigate = useNavigate();

  return (
    <div className="pb-16 overflow-x-hidden">
      <button
        onClick={() => navigate(-1)}
        className="bg-brand-1 text-sm text-dark-2 px-2 py-1 mb-2  md:text-lg md:px-4 md:py-2 rounded md:mb-4"
      >
        Înapoi la categorii
      </button>
      <h1 className="text-lg md:text-4xl md:pb-2 font-bold text-light-3 text-center">
        {category === "Alfabetic" ? "Toate cărțile in ordine alfabetică" : `${category}`}
      </h1>
      <BooksAlphabetical category={category} />
    </div>
  );
}

export default CategoryBooks;
