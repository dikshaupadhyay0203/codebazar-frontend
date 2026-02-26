import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Sidebar({ mobileOpen = false, onClose = () => { } }) {
    const { user, logout } = useAuth();
    const location = useLocation();

    const links = [
        { to: '/dashboard', label: 'Dashboard', roles: ['user', 'creator', 'admin'] },
        { to: '/my-purchases', label: 'My Purchases', roles: ['user', 'creator', 'admin'] },
        { to: '/my-uploads', label: 'My Uploads', roles: ['user', 'creator', 'admin'] },
        { to: '/upload', label: 'Upload Project', roles: ['user', 'creator', 'admin'] },
        { to: '/admin', label: 'Admin Panel', roles: ['admin'] },
        { to: '/profile', label: 'Profile', roles: ['user', 'creator', 'admin'] }
    ];

    const navContent = (
        <>
            <Link to="/dashboard" className="text-xl font-extrabold text-primary">CodeBazaar</Link>
            <p className="mt-1 text-sm text-textmuted">Modern Marketplace Console</p>

            <nav className="mt-8 space-y-2">
                {links
                    .filter((link) => link.roles.includes(user?.role))
                    .map((link) => {
                        const active = location.pathname === link.to;
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={onClose}
                                className={`relative block rounded-xl px-4 py-3 transition-all duration-300 ${active ? 'bg-purple-500/20 text-white' : 'bg-transparent text-slate-200 hover:scale-[1.02] hover:bg-purple-500/10'
                                    }`}
                            >
                                <span className={`absolute left-0 top-2 h-[calc(100%-16px)] w-1 rounded-r-full bg-primary transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`} />
                                {link.label}
                            </Link>
                        );
                    })}
            </nav>

            <div className="card mt-8">
                <p className="text-xs uppercase tracking-wide text-textmuted">Signed in</p>
                <p className="mt-1 font-semibold">{user?.name}</p>
                <p className="text-sm text-textmuted">{user?.email}</p>
            </div>

            <button
                type="button"
                className="btn-muted mt-4 w-full"
                onClick={() => {
                    onClose();
                    logout();
                }}
            >
                Logout
            </button>
        </>
    );

    return (
        <>
            <aside className="sticky top-4 mx-4 my-4 hidden h-[calc(100vh-2rem)] w-72 rounded-3xl border border-white/10 bg-[#0F172A]/70 p-6 shadow-[0_0_60px_rgba(139,92,246,0.1)] backdrop-blur-xl lg:block">
                {navContent}
            </aside>

            <div
                className={`fixed inset-0 z-40 bg-black/50 transition ${mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'} lg:hidden`}
                onClick={onClose}
            />

            <aside
                className={`fixed left-4 top-4 z-50 h-[calc(100vh-2rem)] w-72 rounded-3xl border border-white/10 bg-[#0F172A]/70 p-6 shadow-[0_0_60px_rgba(139,92,246,0.1)] backdrop-blur-xl transition-transform duration-300 lg:hidden ${mobileOpen ? 'translate-x-0' : '-translate-x-[120%]'}`}
            >
                {navContent}
            </aside>
        </>
    );
}

export default Sidebar;
