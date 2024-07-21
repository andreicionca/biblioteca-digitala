import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 rounded-lg mb-4">
      <ul className="flex space-x-4 text-white">
        <li>
          <Link to="/" className="hover:text-gray-300">
            Acasă
          </Link>
        </li>
        {/* Link-ul pentru Admin nu este inclus aici */}
      </ul>
    </nav>
  );
}

export default Navbar;
