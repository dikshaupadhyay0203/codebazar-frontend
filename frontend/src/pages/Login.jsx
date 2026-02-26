import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { validateEmail } from '../utils/validators';
import PageTransition from '../components/PageTransition';

function Login() {
    const navigate = useNavigate();
    const { login, loading } = useAuth();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
        <PageTransition>
            <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-700/30 via-appbg to-emerald-600/20 px-4">
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={onSubmit}
                    className="glass w-full max-w-md rounded-3xl p-8 shadow-glass"
                >
                    <h2 className="text-center text-3xl font-extrabold">Welcome Back</h2>
                    <p className="mt-2 text-center text-sm text-slate-300">Login to access your marketplace dashboard</p>

                    <div className="mt-6 space-y-4">
                        <div className="relative">
                            <span className="pointer-events-none absolute left-3 top-2.5 text-slate-400">✉</span>
                            <input
                                className="input pl-9"
                                placeholder="Email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                        </div>

                        <div className="relative">
                            <span className="pointer-events-none absolute left-3 top-2.5 text-slate-400">🔒</span>
                            <input
                                className="input pl-9 pr-16"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                            <button type="button" className="absolute right-3 top-2 text-sm text-slate-300" onClick={() => setShowPassword((prev) => !prev)}>
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>

                    {error ? <p className="error mt-3">{error}</p> : null}

                    <button className="mt-5 w-full rounded-xl bg-primary px-4 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-500" disabled={loading}>
                        {loading ? 'Please wait...' : 'Login'}
                    </button>

                    <p className="mt-5 text-center text-sm text-slate-300">
                        New here?{' '}
                        <button type="button" className="font-semibold text-secondary hover:underline" onClick={() => navigate('/register')}>
                            Create account
                        </button>
                    </p>
                </motion.form>
            </div>
        </PageTransition>
    );
}

export default Login;
