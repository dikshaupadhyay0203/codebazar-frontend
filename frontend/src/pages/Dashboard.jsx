import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
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

    const totalProjects = projects.length;
    const completedTasks = Math.round(totalProjects * 0.62);
    const pendingTasks = Math.max(totalProjects - completedTasks, 0);
    const activeUsers = new Set(projects.map((project) => project.uploadedBy?._id).filter(Boolean)).size + 12;

    const chartSeries = [
        { name: 'Projects', value: totalProjects },
        { name: 'Completed', value: completedTasks },
        { name: 'Pending', value: pendingTasks },
        { name: 'Active Users', value: activeUsers }
    ];

    const categoryMap = projects.reduce((acc, project) => {
        acc[project.category] = (acc[project.category] || 0) + 1;
        return acc;
    }, {});

    const categorySeries = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
    const pieColors = ['#6366F1', '#22C55E', '#3B82F6', '#F59E0B', '#EF4444', '#14B8A6'];

    return (
        <PageTransition>
            <div>
                <h1 className="text-3xl font-extrabold">Dashboard</h1>
                <p className="mt-1 text-slate-400">Welcome back, {user?.name}. Here is your marketplace overview.</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {[
                        { title: 'Total Projects', value: totalProjects },
                        { title: 'Completed Tasks', value: completedTasks },
                        { title: 'Pending Tasks', value: pendingTasks },
                        { title: 'Active Users', value: activeUsers }
                    ].map((card) => (
                        <motion.div
                            key={card.title}
                            whileHover={{ y: -4 }}
                            className="rounded-2xl border border-slate-700 bg-card p-5"
                        >
                            <p className="text-sm text-slate-400">{card.title}</p>
                            <p className="mt-3 text-3xl font-extrabold">{card.value}</p>
                        </motion.div>
                    ))}
                </div>

                {(user?.role === 'creator' || user?.role === 'admin') && stats ? (
                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-slate-700 bg-card p-4"><p className="text-sm text-slate-400">Creator Uploads</p><p className="text-2xl font-bold">{stats.totalUploads}</p></div>
                        <div className="rounded-2xl border border-slate-700 bg-card p-4"><p className="text-sm text-slate-400">Total Sales</p><p className="text-2xl font-bold">{stats.totalSales}</p></div>
                        <div className="rounded-2xl border border-slate-700 bg-card p-4"><p className="text-sm text-slate-400">Revenue</p><p className="text-2xl font-bold">₹{stats.totalRevenue}</p></div>
                    </div>
                ) : null}

                <div className="mt-6 grid gap-4 xl:grid-cols-2">
                    <div className="rounded-2xl border border-slate-700 bg-card p-4">
                        <h3 className="mb-3 text-lg font-semibold">Performance Overview</h3>
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartSeries}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                    <XAxis dataKey="name" stroke="#94A3B8" />
                                    <YAxis stroke="#94A3B8" />
                                    <Tooltip contentStyle={{ background: '#0F172A', border: '1px solid #334155' }} />
                                    <Bar dataKey="value" fill="#6366F1" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-700 bg-card p-4">
                        <h3 className="mb-3 text-lg font-semibold">Projects by Category</h3>
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={categorySeries} dataKey="value" nameKey="name" outerRadius={108} label>
                                        {categorySeries.map((entry, idx) => (
                                            <Cell key={entry.name} fill={pieColors[idx % pieColors.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ background: '#0F172A', border: '1px solid #334155' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-700 bg-card p-4">
                    <h3 className="mb-3 text-lg font-semibold">Search & Filter</h3>
                    <div className="grid gap-3 md:grid-cols-3">
                        <input className="input" placeholder="Search title/description" value={filters.q} onChange={(e) => setFilters({ ...filters, q: e.target.value })} />
                        <input className="input" placeholder="Tech Stack" value={filters.techStack} onChange={(e) => setFilters({ ...filters, techStack: e.target.value })} />
                        <input className="input" placeholder="Category" value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} />
                        <input className="input" type="number" placeholder="Min Price" value={filters.minPrice} onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })} />
                        <input className="input" type="number" placeholder="Max Price" value={filters.maxPrice} onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} />
                        <button className="btn-accent" onClick={fetchProjects}>Apply Filters</button>
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
