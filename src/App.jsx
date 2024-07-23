import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Categories from "./pages/Categories";
import Suggestions from "./pages/Suggestions";
import Profile from "./pages/Profile";
import Navbar from "./components/common/Navbar";
import MobileNavbar from "./components/common/MobileNavbar";

function App() {
  return (
    <Router>
      <div className="container mx-auto px-4 py-4 pb-24 font-figtree">
        <Navbar />
        <MobileNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
