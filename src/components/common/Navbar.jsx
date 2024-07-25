import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function Navbar() {
  return (
    <nav className="bg-transparent p-4 justify-between items-center hidden md:flex pb-12">
      <div className="flex items-center space-x-2">
      <Link to="/" >
      <img src={logo} alt="Logo" className="h-12 w-12" />
        </Link>
       <Link to="/">
        <span className="text-2xl font-extrabold">Biblioteca digitală</span>
        </Link>
      </div>
      <div className="flex space-x-4">
        <Link to="/" className="hover:text-brand-1">
          Acasă
        </Link>
        <Link to="/categories" className="hover:text-brand-1">
          Categorii
        </Link>
        <Link to="/search" className="hover:text-brand-1">
          Căutare cărți
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
