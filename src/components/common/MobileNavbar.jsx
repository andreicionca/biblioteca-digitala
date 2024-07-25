import { Link, NavLink } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";
import logo from "../../assets/logo.png";

function MobileNavbar() {
  return (
    <div className="md:hidden">
      <nav className="fixed top-0 left-0 z-50 bg-dark-1 w-full p-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-6 w-6" />
          </Link>
          <Link to="/">
            <span className="text-base font-extrabold">Biblioteca Online</span>
          </Link>
        </div>
      </nav>
      <div className="fixed bottom-0 left-0 w-full bg-dark-1 text-light-2 shadow-lg z-50">
        <div className="flex justify-around py-2">
          <NavLink to="/" className="flex flex-col items-center p-2">
            {({ isActive }) => (
              <>
                <HomeIcon
                  className={`h-4 w-4 ${isActive ? "text-light-2 fill-current" : "text-light-1"}`}
                />
                <span className={`text-sm ${isActive ? "text-light-2" : "text-light-1"}`}>
                  Acasă
                </span>
              </>
            )}
          </NavLink>
          <NavLink to="/categories" className="flex flex-col items-center p-2">
            {({ isActive }) => (
              <>
                <BookOpenIcon
                  className={`h-4 w-4 ${isActive ? "text-light-2 fill-current" : "text-light-1"}`}
                />
                <span className={`text-sm ${isActive ? "text-light-2" : "text-light-1"}`}>
                  Categorii
                </span>
              </>
            )}
          </NavLink>
          <NavLink to="/search" className="flex flex-col items-center p-2">
            {({ isActive }) => (
              <>
                <MagnifyingGlassIcon
                  className={`h-4 w-4 ${isActive ? "text-light-2 fill-current" : "text-light-1"}`}
                />
                <span className={`text-sm ${isActive ? "text-light-2" : "text-light-1"}`}>
                  Căutare
                </span>
              </>
            )}
          </NavLink>
          <NavLink to="/suggestions" className="flex flex-col items-center p-2">
            {({ isActive }) => (
              <>
                <LightBulbIcon
                  className={`h-4 w-4 ${isActive ? "text-light-2 fill-current" : "text-light-1"}`}
                />
                <span className={`text-sm ${isActive ? "text-light-2" : "text-light-1"}`}>
                  Sugestii
                </span>
              </>
            )}
          </NavLink>
          <NavLink to="/profile" className="flex flex-col items-center p-2">
            {({ isActive }) => (
              <>
                <UserIcon
                  className={`h-4 w-4 ${isActive ? "text-brand-1 fill-current" : "text-brand-2"}`}
                />
                <span className={`text-sm ${isActive ? "text-brand-1" : "text-brand-2"}`}>
                  Profil
                </span>
              </>
            )}
          </NavLink>
        </div>
      </div>
      {/* Adaugă un padding-top suficient pentru a compensa navbar-ul */}
      <div className="pt-10">
        {/* Conținutul principal al paginii tale aici */}
      </div>
    </div>
  );
}

export default MobileNavbar;
