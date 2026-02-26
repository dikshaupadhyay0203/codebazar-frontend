import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ProjectCard from '../components/ProjectCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getCreatorDashboard, getProjects } from '../services/projectService';
import { useAuth } from '../hooks/useAuth';

function Dashboard() {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ q: '', techStack: '', category: '', minPrice: '', maxPrice: '' });

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const data = await getProjects({ ...filters, page: 1, limit: 12 });
            setProjects(data.projects);
        } catch {
            toast.error('Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        if (user?.role === 'creator' || user?.role === 'admin') {
            getCreatorDashboard().then(setStats).catch(() => null);
        }
    }, [user]);

    return (
        <div>
            <h2>Dashboard</h2>

            {(user?.role === 'creator' || user?.role === 'admin') && stats ? (
                <div className="grid grid-3" style={{ margin: '1rem 0' }}>
                    <div className="card"><h4>Total Uploads</h4><p>{stats.totalUploads}</p></div>
                    <div className="card"><h4>Total Sales</h4><p>{stats.totalSales}</p></div>
                    <div className="card"><h4>Total Earnings</h4><p>₹{stats.totalRevenue}</p></div>
                </div>
            ) : null}

            <div className="card" style={{ marginBottom: '1rem' }}>
                <h3>Search & Filter</h3>
                <div className="grid grid-3">
                    <input className="input" placeholder="Search title/description" value={filters.q} onChange={(e) => setFilters({ ...filters, q: e.target.value })} />
                    <input className="input" placeholder="Tech Stack" value={filters.techStack} onChange={(e) => setFilters({ ...filters, techStack: e.target.value })} />
                    <input className="input" placeholder="Category" value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} />
                    <input className="input" type="number" placeholder="Min Price" value={filters.minPrice} onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })} />
                    <input className="input" type="number" placeholder="Max Price" value={filters.maxPrice} onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} />
                    <button className="btn btn-accent" onClick={fetchProjects}>Apply</button>
                </div>
            </div>

            {loading ? <LoadingSpinner /> : null}
            <div className="grid grid-3">
                {projects.map((project) => <ProjectCard key={project._id} project={project} />)}
            </div>
        </div>
    );
}

export default Dashboard;
