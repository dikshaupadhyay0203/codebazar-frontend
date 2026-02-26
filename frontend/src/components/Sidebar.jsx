import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Sidebar() {
    const { user, logout } = useAuth();
    const location = useLocation();

    const links = [
        { to: '/dashboard', label: 'Dashboard', roles: ['user', 'creator', 'admin'] },
        { to: '/my-purchases', label: 'My Purchases', roles: ['user', 'creator', 'admin'] },
        { to: '/my-uploads', label: 'My Uploads', roles: ['creator', 'admin'] },
        { to: '/upload', label: 'Upload Project', roles: ['creator', 'admin'] },
        { to: '/admin', label: 'Admin Panel', roles: ['admin'] },
        { to: '/profile', label: 'Profile', roles: ['user', 'creator', 'admin'] }
    ];

    return (
        <aside className="hidden min-h-screen w-72 border-r border-slate-700/60 bg-slate-900/80 p-6 lg:block">
            <Link to="/dashboard" className="text-xl font-extrabold text-primary">CodeBazaar</Link>
            <p className="mt-1 text-sm text-slate-300">Modern Marketplace Console</p>

            <nav className="mt-8 space-y-2">
                {links
                    .filter((link) => link.roles.includes(user?.role))
                    .map((link) => {
                        const active = location.pathname === link.to;
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`block rounded-xl px-4 py-3 transition ${active ? 'bg-primary text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
            </nav>

            <div className="mt-8 rounded-2xl border border-slate-700 bg-card p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Signed in</p>
                <p className="mt-1 font-semibold">{user?.name}</p>
                <p className="text-sm text-slate-400">{user?.email}</p>
            </div>

            <button type="button" className="mt-4 w-full rounded-xl bg-slate-700 px-4 py-2 font-semibold text-slate-100 transition hover:bg-slate-600" onClick={logout}>
                Logout
            </button>
        </aside>
    );
}

export default Sidebar;
