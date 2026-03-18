import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchApi } from '../utils/api';
import { Navigate } from 'react-router-dom';
import { PlusCircle, Trash2 } from 'lucide-react';

export default function Admin() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchApi('/products');
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetchApi('/products', {
        method: 'POST',
        body: JSON.stringify({ name, description, price, imageUrl }),
      });
      setName(''); setDescription(''); setPrice(''); setImageUrl('');
      loadProducts();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await fetchApi(`/products/${id}`, { method: 'DELETE' });
      loadProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="container" style={{paddingTop: '3rem', paddingBottom: '3rem'}}>
      <h2 style={{fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '2rem'}}>Admin Dashboard</h2>
      
      <div style={{display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem'}}>
        <div className="glass-card" style={{padding: '2rem', height: 'fit-content'}}>
          <h3 style={{fontSize: '1.5rem', marginBottom: '1.5rem'}}>Add New Product</h3>
          <form onSubmit={handleAdd} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <input 
              placeholder="Product Name" className="input-field" required
              value={name} onChange={e => setName(e.target.value)} 
            />
            <textarea 
              placeholder="Description" className="input-field" required rows="3"
              value={description} onChange={e => setDescription(e.target.value)} 
            />
            <input 
              type="number" step="0.01" placeholder="Price ($)" className="input-field" required
              value={price} onChange={e => setPrice(e.target.value)} 
            />
            <input 
              placeholder="Image URL (optional)" className="input-field"
              value={imageUrl} onChange={e => setImageUrl(e.target.value)} 
            />
            <button type="submit" className="btn btn-primary" disabled={loading} style={{marginTop: '1rem'}}>
              <PlusCircle size={20} /> {loading ? 'Adding...' : 'Add Product'}
            </button>
          </form>
        </div>

        <div>
          <h3 style={{fontSize: '1.5rem', marginBottom: '1.5rem'}}>Manage Products ({products.length})</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            {products.map(product => (
              <div key={product.id} className="glass-card" style={{padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{display: 'flex', gap: '1.5rem', alignItems: 'center'}}>
                  <div style={{
                    width: '60px', height: '60px', borderRadius: '8px', 
                    backgroundImage: `url(${product.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400'})`,
                    backgroundSize: 'cover', backgroundPosition: 'center'
                  }} />
                  <div>
                    <h4 style={{fontSize: '1.1rem', fontWeight: 600}}>{product.name}</h4>
                    <span style={{color: 'var(--text-muted)'}}>${product.price.toFixed(2)}</span>
                  </div>
                </div>
                <button onClick={() => handleDelete(product.id)} className="btn btn-secondary" style={{borderColor: '#ef4444', color: '#ef4444'}}>
                  <Trash2 size={18} /> Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
