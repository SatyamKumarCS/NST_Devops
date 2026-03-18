import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchApi } from '../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await fetchApi('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container" style={{display: 'flex', justifyContent: 'center', paddingTop: '4rem'}}>
      <div className="glass-card" style={{width: '100%', maxWidth: '400px', padding: '2rem'}}>
        <h2 style={{fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center', color: 'var(--primary)'}}>
          Create Account
        </h2>
        {error && <div style={{color: '#ef4444', marginBottom: '1rem', textAlign: 'center'}}>{error}</div>}
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <input 
            type="text" 
            placeholder="Full Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className="input-field"
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="input-field"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="input-field"
          />
          <button type="submit" className="btn btn-primary" style={{marginTop: '1rem'}}>
            <UserPlus size={20} /> Sign Up
          </button>
        </form>
        <p style={{marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)'}}>
          Already have an account? <Link to="/login" style={{color: 'var(--primary)', fontWeight: 600}}>Login</Link>
        </p>
      </div>
    </div>
  );
}
