import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Navbar() {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <header style={{ background: '#111827', borderBottom: '1px solid #1f2937' }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0' }}>
                <Link to="/dashboard" style={{ fontWeight: 700, color: '#10B981' }}>CodeBazaar</Link>
                <nav style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <Link to="/dashboard">Dashboard</Link>
                    {isAuthenticated && <Link to="/my-purchases">My Purchases</Link>}
                    {isAuthenticated && (user?.role === 'creator' || user?.role === 'admin') && <Link to="/upload">Upload</Link>}
                    {isAuthenticated && (user?.role === 'creator' || user?.role === 'admin') && <Link to="/my-uploads">My Uploads</Link>}
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
