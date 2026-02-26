import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';

function DashboardLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    return (
        <div className="relative min-h-screen bg-appbg text-textmain lg:flex">
            <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="dashboard-grid relative z-10 isolate w-full p-4 before:pointer-events-none before:absolute before:inset-0 before:bg-[url('/noise.png')] before:opacity-[0.04] before:content-[''] lg:p-8"
            >
                <div className="pointer-events-none absolute inset-0 z-[-1]">
                    <div className="absolute left-[-100px] top-[-100px] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[-100px] right-[-100px] h-[600px] w-[600px] rounded-full bg-indigo-600/20 blur-[150px] animate-pulse delay-2000 [animation-delay:2s]" />
                    <div className="absolute left-[30%] top-[40%] h-[400px] w-[400px] rounded-full bg-fuchsia-600/20 blur-[140px] animate-pulse delay-1000 [animation-delay:1s]" />
                </div>
                <div className="sticky top-0 z-30 mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
                    <button
                        type="button"
                        className="rounded-lg border border-white/10 px-3 py-1.5 text-sm font-semibold text-slate-200 transition-all duration-300 hover:scale-105 hover:bg-purple-500/10 lg:hidden"
                        onClick={() => setMobileOpen((prev) => !prev)}
                    >
                        Menu
                    </button>
                    <p className="text-sm font-semibold text-primary">CodeBazaar Dashboard</p>
                </div>
                <Outlet />
            </motion.main>
        </div>
    );
}

export default DashboardLayout;
