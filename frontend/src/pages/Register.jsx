import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, validateStrongPassword } from '../utils/validators';

function Register() {
    const navigate = useNavigate();
    const { register, loading } = useAuth();
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
    const [error, setError] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!validateEmail(form.email)) {
            setError('Invalid email format');
            return;
        }

        if (!validateStrongPassword(form.password)) {
            setError('Password must have upper, lower, number, symbol and 8+ chars');
            return;
        }

        try {
            await register(form);
            toast.success('Registration successful');
            navigate('/dashboard');
        } catch (apiError) {
            setError(apiError.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <form className="card" onSubmit={onSubmit} style={{ maxWidth: 520, margin: '1.5rem auto' }}>
            <h2>Register</h2>
            <input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="input" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ marginTop: 10 }} />
            <input className="input" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={{ marginTop: 10 }} />
            <select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} style={{ marginTop: 10 }}>
                <option value="user">User</option>
                <option value="creator">Creator</option>
            </select>
            {error ? <p className="error">{error}</p> : null}
            <button className="btn btn-accent" disabled={loading} style={{ marginTop: 10 }}>{loading ? 'Please wait...' : 'Create account'}</button>
        </form>
    );
}

export default Register;
