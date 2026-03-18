import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Truck, Package, ArrowLeft, CreditCard } from 'lucide-react';

export default function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOrdered, setIsOrdered] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!user) return <div className="container" style={{paddingTop: '150px', textAlign: 'center', minHeight: '60vh'}}>
    <h2 style={{marginBottom: '1rem'}}>Access Denied</h2>
    <p style={{color: 'var(--text-muted)', marginBottom: '2rem'}}>Please login to finalize your purchase.</p>
    <button onClick={() => navigate('/login')} className="btn btn-primary">Sign In to Account</button>
  </div>;

  if (cartItems.length === 0 && !isOrdered) {
    return (
      <div className="container" style={{paddingTop: '150px', textAlign: 'center', minHeight: '60vh'}}>
        <Package size={64} color="var(--text-dim)" style={{marginBottom: '1.5rem', opacity: 0.5}} />
        <h2 style={{fontSize: '2rem', fontWeight: 800, marginBottom: '1rem'}}>Your cart is empty</h2>
        <p style={{color: 'var(--text-muted)', marginBottom: '2.5rem'}}>Add some premium items to your vault to proceed.</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Explore Catalog
        </button>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setIsOrdered(true);
      clearCart();
      setLoading(false);
    }, 2000);
  };

  if (isOrdered) {
    return (
      <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', paddingTop: '80px'}}>
        <div className="glass-card" style={{padding: '4rem', textAlign: 'center', maxWidth: '540px', border: 'none', boxShadow: 'var(--shadow-lg)', animation: 'fadeIn 0.6s ease-out'}}>
          <div style={{width: '100px', height: '100px', backgroundColor: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem'}}>
            <CheckCircle size={56} color="#16a34a" />
          </div>
          <h2 style={{fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 800, color: '#000'}}>Order Complete!</h2>
          <p style={{color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.6}}>
            Success! Your order has been placed. {user.name}, your premium tech will be delivered via <strong>Cash on Delivery</strong> soon.
          </p>
          <button onClick={() => navigate('/')} className="btn btn-primary" style={{width: '100%', padding: '1.25rem', fontSize: '1.1rem'}}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{paddingTop: '120px', paddingBottom: '6rem'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem'}}>
        <button onClick={() => navigate(-1)} style={{background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.9rem'}}>
          <ArrowLeft size={18} /> BACK TO STORE
        </button>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '5rem'}}>
        <div>
          <h2 style={{fontSize: '2rem', marginBottom: '2.5rem', fontWeight: 800, color: '#000'}}>Review & Checkout</h2>
          
          <div className="glass-card" style={{padding: '2.5rem', marginBottom: '2rem', border: 'none', boxShadow: 'var(--shadow-sm)'}}>
            <h3 style={{fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800}}>
              <Truck size={22} color="var(--primary)" /> SHIPPING DESTINATION
            </h3>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem'}}>
              <div>
                <p style={{fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-dim)', marginBottom: '0.25rem'}}>CUSTOMER</p>
                <p style={{fontWeight: 600}}>{user.name}</p>
                <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>{user.email}</p>
              </div>
              <div>
                <p style={{fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-dim)', marginBottom: '0.25rem'}}>ESTIMATED ARRIVAL</p>
                <p style={{fontWeight: 600}}>Standard (3-5 Days)</p>
                <p style={{color: 'var(--secondary)', fontSize: '0.8rem', fontWeight: 700}}>FREE DELIVERY</p>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{padding: '2.5rem', border: 'none', boxShadow: 'var(--shadow-sm)'}}>
            <h3 style={{fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800}}>
              <CreditCard size={22} color="var(--primary)" /> PAYMENT METHOD
            </h3>
            <div style={{
              border: '2px solid var(--primary)', 
              padding: '1.5rem', 
              borderRadius: 'var(--radius-md)', 
              backgroundColor: '#eff6ff',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem'
            }}>
              <div style={{width: '24px', height: '24px', borderRadius: '50%', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
                <div style={{width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--primary)'}} />
              </div>
              <div>
                <p style={{fontWeight: 800, color: '#1e40af'}}>Cash on Delivery (COD)</p>
                <p style={{fontSize: '0.85rem', color: '#60a5fa'}}>Pay in person upon receipt of items</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="glass-card" style={{padding: '2.5rem', position: 'sticky', top: '120px', border: 'none', boxShadow: 'var(--shadow-md)'}}>
            <h3 style={{fontSize: '1.2rem', marginBottom: '2rem', fontWeight: 800}}>Order Summary</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '2rem'}}>
              {cartItems.map(item => (
                <div key={item.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                    <div style={{width: '40px', height: '40px', borderRadius: '6px', background: 'var(--bg-secondary)', overflow: 'hidden'}}>
                      <img src={item.imageUrl} alt="" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                    </div>
                    <div>
                      <p style={{fontWeight: 700, fontSize: '0.9rem'}}>{item.name}</p>
                      <p style={{fontSize: '0.8rem', color: 'var(--text-dim)'}}>Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span style={{fontWeight: 600}}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)'}}>
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)'}}>
                <span>Shipping</span>
                <span style={{color: 'var(--secondary)', fontWeight: 700}}>FREE</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '1.4rem', fontWeight: 800, color: '#000', marginTop: '0.5rem'}}>
                <span>Total</span>
                <span style={{color: 'var(--primary)'}}>${getCartTotal().toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handlePlaceOrder} 
              className="btn btn-primary" 
              style={{width: '100%', padding: '1.25rem', borderRadius: 'var(--radius-sm)', fontSize: '1.1rem'}}
              disabled={loading}
            >
              {loading ? 'Finalizing...' : 'Complete Purchase'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
