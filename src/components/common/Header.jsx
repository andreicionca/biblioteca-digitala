import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function Header() {
  return (
    <nav className="fixed top-0 left-0 z-50 bg-dark-1 w-full p-3 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-6 w-6" />
        </Link>
        <Link to="/">
          <span className="text-base font-extrabold text-light-3">Biblioteca digitală</span>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
