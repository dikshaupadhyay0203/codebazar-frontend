import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

function DashboardLayout() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-appbg text-textmain lg:flex">
            <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
            <main className="w-full p-4 lg:p-8">
                <div className="mb-4 flex items-center justify-between rounded-xl border border-slate-700/60 bg-slate-900/70 px-4 py-3 lg:hidden">
                    <button
                        type="button"
                        className="rounded-lg border border-slate-600 px-3 py-1.5 text-sm font-semibold text-slate-200"
                        onClick={() => setMobileOpen((prev) => !prev)}
                    >
                        Menu
                    </button>
                    <p className="text-sm font-semibold text-primary">CodeBazaar</p>
                </div>
                <Outlet />
            </main>
        </div>
    );
}

export default DashboardLayout;
