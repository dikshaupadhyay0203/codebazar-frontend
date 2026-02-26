import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import SkeletonCard from '../components/SkeletonCard';
import { getCreatorDashboard, getProjects } from '../services/projectService';
import { useAuth } from '../hooks/useAuth';
import PageTransition from '../components/PageTransition';

function Dashboard() {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ q: '', techStack: '', category: '', minPrice: '', maxPrice: '' });
    const [appliedFilters, setAppliedFilters] = useState({ q: '', techStack: '', category: '', minPrice: '', maxPrice: '' });

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getProjects({ ...appliedFilters, page: 1, limit: 12 });
            setProjects(data.projects);
        } catch {
            toast.error('Failed to load projects');
        } finally {
            setLoading(false);
        }
    }, [appliedFilters]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    useEffect(() => {
        if (user?.role === 'creator' || user?.role === 'admin') {
            getCreatorDashboard().then(setStats).catch(() => null);
        }
    }, [user]);

    const totalProjects = projects.length;
    const activeCreators = useMemo(
        () => new Set(projects.map((project) => project.uploadedBy?._id).filter(Boolean)).size,
        [projects]
    );

    return (
        <PageTransition>
            <div>
                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Dashboard</h1>
                <p className="mt-1 text-textmuted">Welcome back, {user?.name}. Here is your marketplace overview.</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
                    {[
                        { title: 'Total Projects', value: totalProjects, icon: '📦' },
                        { title: 'Active Creators', value: activeCreators, icon: '👥' }
                    ].map((card) => (
                        <motion.div
                            key={card.title}
                            className="card card-hover p-5"
                        >
                            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-purple-500/10 p-3 text-purple-400">
                                <span aria-hidden>{card.icon}</span>
                            </div>
                            <p className="text-sm text-textmuted">{card.title}</p>
                            <p className="mt-3 text-3xl font-extrabold">{card.value}</p>
                        </motion.div>
                    ))}
                </div>

                {(user?.role === 'creator' || user?.role === 'admin') && stats ? (
                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                        <div className="card card-hover p-4"><div className="mb-3 inline-flex rounded-full bg-purple-500/10 p-3 text-purple-400">⬆️</div><p className="text-sm text-textmuted">Creator Uploads</p><p className="text-2xl font-bold">{stats.totalUploads}</p></div>
                        <div className="card card-hover p-4"><div className="mb-3 inline-flex rounded-full bg-purple-500/10 p-3 text-purple-400">🛒</div><p className="text-sm text-textmuted">Total Sales</p><p className="text-2xl font-bold">{stats.totalSales}</p></div>
                        <div className="card card-hover p-4"><div className="mb-3 inline-flex rounded-full bg-purple-500/10 p-3 text-purple-400">₹</div><p className="text-sm text-textmuted">Revenue</p><p className="text-2xl font-bold">₹{stats.totalRevenue}</p></div>
                    </div>
                ) : null}

                <div className="card mt-6 p-4">
                    <h3 className="mb-3 text-lg font-semibold">Search & Filter</h3>
                    <div className="grid gap-3 md:grid-cols-3">
                        <input className="input" placeholder="Search title/description" value={filters.q} onChange={(e) => setFilters({ ...filters, q: e.target.value })} />
                        <input className="input" placeholder="Tech Stack" value={filters.techStack} onChange={(e) => setFilters({ ...filters, techStack: e.target.value })} />
                        <input className="input" placeholder="Category" value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} />
                        <input className="input" type="number" placeholder="Min Price" value={filters.minPrice} onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })} />
                        <input className="input" type="number" placeholder="Max Price" value={filters.maxPrice} onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} />
                        <button className="btn-accent hover:scale-110 hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] active:scale-95 transition-all duration-300" onClick={() => setAppliedFilters(filters)}>Apply Filters</button>
                    </div>
                </div>

                <h3 className="mt-6 text-xl font-semibold">Available Projects</h3>
                <div className="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {loading ? Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={`s-${idx}`} />) : projects.map((project) => <ProjectCard key={project._id} project={project} />)}
                </div>
            </div>
        </PageTransition>
    );
}

export default Dashboard;
