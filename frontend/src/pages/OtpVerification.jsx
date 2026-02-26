import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { resendRegistrationOtp, verifyRegistrationOtp } from '../services/authService';

function OtpVerification() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';

    const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        if (!email) {
            navigate('/register', { replace: true });
        }
    }, [email, navigate]);

    useEffect(() => {
        if (timer <= 0) return undefined;
        const interval = setInterval(() => {
            setTimer((prev) => Math.max(prev - 1, 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const otp = useMemo(() => otpDigits.join(''), [otpDigits]);

    const updateDigit = (index, value) => {
        if (!/^\d?$/.test(value)) return;
        const next = [...otpDigits];
        next[index] = value;
        setOtpDigits(next);

        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index, event) => {
        if (event.key === 'Backspace' && !otpDigits[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handlePaste = (event) => {
        event.preventDefault();
        const text = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (!text) return;

        const next = ['', '', '', '', '', ''];
        text.split('').forEach((digit, idx) => {
            next[idx] = digit;
        });
        setOtpDigits(next);

        const focusIndex = Math.min(text.length, 5);
        const nextInput = document.getElementById(`otp-${focusIndex}`);
        nextInput?.focus();
    };

    const onVerify = async () => {
        if (otp.length !== 6) {
            toast.error('Please enter 6 digit OTP');
            return;
        }

        setLoading(true);
        try {
            await verifyRegistrationOtp({ email, otp });
            toast.success('Account Verified Successfully');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid or expired OTP');
        } finally {
            setLoading(false);
        }
    };

    const onResend = async () => {
        if (timer > 0) return;

        setResending(true);
        try {
            await resendRegistrationOtp({ email });
            toast.success('OTP sent to your email');
            setTimer(60);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to resend OTP');
        } finally {
            setResending(false);
        }
    };

    return (
        <PageTransition>
            <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-700/30 via-appbg to-emerald-600/20 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass w-full max-w-md rounded-3xl p-8 shadow-glass"
                >
                    <h2 className="text-center text-3xl font-extrabold">Verify OTP</h2>
                    <p className="mt-2 text-center text-sm text-slate-300">Enter the 6 digit OTP sent to {email}</p>

                    <div className="mt-6 flex justify-center gap-2" onPaste={handlePaste}>
                        {otpDigits.map((digit, index) => (
                            <input
                                key={`otp-${index}`}
                                id={`otp-${index}`}
                                className="h-12 w-11 rounded-xl border border-slate-600 bg-slate-800 text-center text-lg font-semibold text-textmain outline-none transition focus:border-primary"
                                value={digit}
                                maxLength={1}
                                onChange={(event) => updateDigit(index, event.target.value)}
                                onKeyDown={(event) => handleKeyDown(index, event)}
                            />
                        ))}
                    </div>

                    <button
                        type="button"
                        className="mt-6 w-full rounded-xl bg-primary px-4 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-500"
                        onClick={onVerify}
                        disabled={loading}
                    >
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>

                    <button
                        type="button"
                        className="mt-3 w-full rounded-xl border border-slate-600 px-4 py-3 font-semibold text-slate-200 transition disabled:cursor-not-allowed disabled:opacity-50"
                        onClick={onResend}
                        disabled={timer > 0 || resending}
                    >
                        {resending ? 'Resending...' : timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
                    </button>
                </motion.div>
            </div>
        </PageTransition>
    );
}

export default OtpVerification;