import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { validateEmail } from '../utils/validators';

function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!validateEmail(form.email)) {
      setError('Invalid email format');
      return;
    }

    try {
      await login(form);
      toast.success('Welcome back');
      navigate('/dashboard');
    } catch (apiError) {
      setError(apiError.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form className="card" onSubmit={onSubmit} style={{ maxWidth: 520, margin: '1.5rem auto' }}>
      <h2>Login</h2>
      <input className="input" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="input" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={{ marginTop: 10 }} />
      {error ? <p className="error">{error}</p> : null}
      <button className="btn btn-accent" disabled={loading} style={{ marginTop: 10 }}>{loading ? 'Please wait...' : 'Login'}</button>
    </form>
  );
}

export default Login;
