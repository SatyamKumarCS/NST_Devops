import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingBag, Search, ShoppingCart, User as UserIcon, LogOut } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';

const Navigation = () => {
  const { user, logout } = useAuth();
  const { getItemCount } = useCart();
  
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="brand">
          <div style={{background: 'var(--primary)', color: 'white', padding: '6px', borderRadius: '8px', display: 'flex'}}>
            <ShoppingBag size={20} />
          </div>
          ShopSmart
        </Link>

        <div className="nav-links-center">
          <Link to="/">Shop</Link>
          <Link to="/">Categories</Link>
          <Link to="/">Deals</Link>
          <Link to="/">About</Link>
        </div>

        <div className="nav-actions">
          <div className="search-container">
            <Search size={18} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)'}} />
            <input type="text" placeholder="Search products..." className="search-input" />
          </div>
          
          <div style={{display: 'flex', gap: '1.25rem', alignItems: 'center'}}>
            <Link to="/checkout" style={{position: 'relative', color: 'var(--text-main)', display: 'flex', alignItems: 'center'}}>
              <ShoppingCart size={22} />
              {getItemCount() > 0 && (
                <span style={{
                  position: 'absolute', top: '-8px', right: '-8px', 
                  background: 'var(--primary)', color: 'white', 
                  borderRadius: '50%', width: '18px', height: '18px',
                  fontSize: '0.65rem', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold'
                }}>
                  {getItemCount()}
                </span>
              )}
            </Link>

            <Link to="/admin" style={{color: 'var(--text-main)', display: 'flex'}}>
              <UserIcon size={22} />
            </Link>

            {user && (
              <button onClick={logout} style={{background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)', display: 'flex', alignItems: 'center'}}>
                <LogOut size={22} />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Navigation />
          <main style={{backgroundColor: 'white', minHeight: '80vh'}} className="page-transition">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          
          <footer className="container">
            <div className="footer-grid">
              <div>
                <Link to="/" className="brand" style={{marginBottom: '1rem'}}>
                  <div style={{background: 'var(--primary)', color: 'white', padding: '6px', borderRadius: '8px', display: 'flex'}}>
                    <ShoppingBag size={20} />
                  </div>
                  ShopSmart
                </Link>
                <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>
                  Redefining the digital marketplace with handpicked premium tech essentials for creators and professionals.
                </p>
              </div>
              <div>
                <h4 style={{marginBottom: '1.5rem', fontSize: '1rem'}}>Product</h4>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem'}}>
                  <Link to="/">Catalog</Link>
                  <Link to="/">New Arrivals</Link>
                  <Link to="/">Bestsellers</Link>
                </div>
              </div>
              <div>
                <h4 style={{marginBottom: '1.5rem', fontSize: '1rem'}}>Company</h4>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem'}}>
                  <Link to="/">About Us</Link>
                  <Link to="/">Careers</Link>
                  <Link to="/">Privacy Policy</Link>
                </div>
              </div>
              <div>
                <h4 style={{marginBottom: '1.5rem', fontSize: '1rem'}}>Newsletter</h4>
                <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem'}}>Get the latest updates on new drops.</p>
                <div style={{display: 'flex', gap: '0.5rem'}}>
                  <input type="email" placeholder="Email" className="search-input" style={{flex: 1, paddingLeft: '1rem'}} />
                  <button className="btn btn-primary" style={{padding: '0.5rem'}}>{">"}</button>
                </div>
              </div>
            </div>
            <div style={{paddingTop: '2rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontSize: '0.8rem'}}>
              <p>© 2024 SHOPSMART INC. ALL RIGHTS RESERVED.</p>
              <div style={{display: 'flex', gap: '1.5rem'}}>
                <span>TWITTER</span>
                <span>INSTAGRAM</span>
                <span>LINKEDIN</span>
              </div>
            </div>
          </footer>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
