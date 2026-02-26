import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { validateEmail, validateStrongPassword } from '../utils/validators';
import PageTransition from '../components/PageTransition';

function Register() {
    const navigate = useNavigate();
    const { register, loading } = useAuth();
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const strengthScore = (() => {
        const value = form.password || '';
        let score = 0;
        if (value.length >= 8) score += 1;
        if (/[A-Z]/.test(value)) score += 1;
        if (/[0-9]/.test(value)) score += 1;
        if (/[^A-Za-z0-9]/.test(value)) score += 1;
        return score;
    })();

    const strengthText = ['Weak', 'Weak', 'Fair', 'Good', 'Strong'][strengthScore];
    const strengthColor = ['bg-rose-500', 'bg-rose-500', 'bg-amber-500', 'bg-lime-500', 'bg-secondary'][strengthScore];

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
            toast.success('OTP sent to your email');
            navigate('/verify-otp', { state: { email: form.email } });
        } catch (apiError) {
            setError(apiError.response?.data?.message || 'Registration failed');
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
                    <h2 className="text-center text-3xl font-extrabold">Create Account</h2>
                    <p className="mt-2 text-center text-sm text-slate-300">Join as a buyer or creator</p>

                    <div className="mt-6 space-y-4">
                        <div className="relative">
                            <span className="pointer-events-none absolute left-3 top-2.5 text-slate-400">👤</span>
                            <input className="input pl-9" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        </div>

                        <div className="relative">
                            <span className="pointer-events-none absolute left-3 top-2.5 text-slate-400">✉</span>
                            <input className="input pl-9" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
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

                        <div>
                            <div className="h-2 w-full overflow-hidden rounded bg-slate-700">
                                <div className={`h-full ${strengthColor}`} style={{ width: `${(strengthScore / 4) * 100}%` }} />
                            </div>
                            <p className="mt-1 text-xs text-slate-300">Password strength: {strengthText}</p>
                        </div>

                        <select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                            <option value="user">User</option>
                            <option value="creator">Creator</option>
                        </select>
                    </div>

                    {error ? <p className="error mt-3">{error}</p> : null}

                    <button className="mt-5 w-full rounded-xl bg-primary px-4 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-500" disabled={loading}>
                        {loading ? 'Please wait...' : 'Create account'}
                    </button>

                    <p className="mt-5 text-center text-sm text-slate-300">
                        Already have an account?{' '}
                        <button type="button" className="font-semibold text-secondary hover:underline" onClick={() => navigate('/login')}>
                            Login
                        </button>
                    </p>
                </motion.form>
            </div>
        </PageTransition>
    );
}

export default Register;
