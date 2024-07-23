import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  LightBulbIcon,
} from "@heroicons/react/24/outline";

function MobileNavbar() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-dark-1 text-light-2 shadow-lg z-50 md:hidden ">
      <div className="flex justify-around py-2">
        <NavLink to="/" className="flex flex-col items-center p-2">
          {({ isActive }) => (
            <>
              <HomeIcon
                className={`h-4 w-4 ${isActive ? "text-light-2 fill-current" : "text-light-1"}`}
              />
              <span
                className={`text-sm ${isActive ? "text-white" : "text-light-1"}`}
              >
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
              <span
                className={`text-sm ${isActive ? "text-white" : "text-light-1"}`}
              >
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
              <span
                className={`text-sm ${isActive ? "text-white" : "text-light-1"}`}
              >
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
              <span
                className={`text-sm ${isActive ? "text-white" : "text-light-1"}`}
              >
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
              <span
                className={`text-sm ${isActive ? "text-brand-1" : "text-brand-2"}`}
              >
                Profil
              </span>
            </>
          )}
        </NavLink>
      </div>
    </div>
  );
}

export default MobileNavbar;
