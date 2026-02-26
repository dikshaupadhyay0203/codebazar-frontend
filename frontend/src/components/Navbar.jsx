import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <header className="sticky top-0 z-40 border-b border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="container flex items-center justify-between py-4">
                <Link to="/dashboard" className="font-bold text-primary">CodeBazaar</Link>
                <nav className="flex items-center gap-3 text-sm text-textmain">
                    <Link to="/dashboard">Dashboard</Link>
                    {isAuthenticated && <Link to="/my-purchases">My Purchases</Link>}
                    {isAuthenticated && <Link to="/upload">Upload</Link>}
                    {isAuthenticated && <Link to="/my-uploads">My Uploads</Link>}
                    {isAuthenticated && user?.role === 'admin' && <Link to="/admin">Admin</Link>}
                    {isAuthenticated ? (
                        <>
                            <Link to="/profile">Profile</Link>
                            <button type="button" className="btn btn-muted" onClick={logout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
