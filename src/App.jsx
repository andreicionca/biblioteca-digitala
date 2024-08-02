import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Search from './pages/Search';
import Suggestions from './pages/Suggestions';
import Profile from './pages/Profile';
import CategoryBooks from './pages/CategoryBooks';
import Navbar from './components/common/Navbar';
import MobileNavbar from './components/common/MobileNavbar';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const location = useLocation();

  // Determinăm dacă suntem pe paginile de login, setare parolă sau înregistrare
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="container mx-auto px-4 py-4 pb-24 font-figtree">
      {!isAuthPage && <Navbar />}
      {!isAuthPage && <MobileNavbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/search" element={<Search />} />
          <Route path="/categories/:category" element={<CategoryBooks />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
