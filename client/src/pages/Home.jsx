import { useState, useEffect } from 'react';
import { fetchApi } from '../utils/api';
import { ShoppingCart } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchApi('/products');
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) return <div className="container" style={{paddingTop: '2rem'}}>Loading amazing products...</div>;

  return (
    <div className="container" style={{paddingTop: '2rem', paddingBottom: '4rem'}}>
      <div style={{textAlign: 'center', marginBottom: '3rem'}}>
        <h1 style={{fontSize: '3rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem'}}>
          Discover Extraordinarily.
        </h1>
        <p style={{fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto'}}>
          Shop the most vibrant, modern selection of the year with our newly curated catalogue.
        </p>
      </div>

      <div className="grid-products">
        {products.length === 0 ? (
          <div style={{textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-muted)'}}>
            No products available yet. Check back soon!
          </div>
        ) : (
          products.map(product => (
            <div key={product.id} className="glass-card" style={{padding: '1.5rem', display: 'flex', flexDirection: 'column'}}>
              <div style={{
                height: '200px', 
                backgroundColor: '#f1f5f9', 
                borderRadius: '8px', 
                marginBottom: '1rem',
                backgroundImage: `url(${product.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} />
              <h3 style={{fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem'}}>{product.name}</h3>
              <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', flexGrow: 1}}>
                {product.description}
              </p>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto'}}>
                <span style={{fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)'}}>${product.price.toFixed(2)}</span>
                <button className="btn btn-primary" style={{padding: '0.5rem 1rem'}}>
                  <ShoppingCart size={18} /> Add
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
