import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingBag, User, LogOut } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';

const Navigation = () => {
  const { user, logout } = useAuth();
  
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="brand">
          <ShoppingBag size={28} />
          ShopSmart
        </Link>
        <div className="nav-links">
          {user ? (
            <>
              <span style={{fontWeight: 500}}>Hi, {user.name}</span>
              <Link to="/admin" className="btn btn-secondary">Admin</Link>
              <button onClick={logout} className="btn btn-secondary" style={{border: 'none', color: 'var(--text-muted)'}}>
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navigation />
        <main className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;
