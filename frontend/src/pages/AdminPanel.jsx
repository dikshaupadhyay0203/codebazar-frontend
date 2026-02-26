import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { approveProject, getPendingProjects } from '../services/projectService';
import PageTransition from '../components/PageTransition';

function AdminPanel() {
    const [pendingProjects, setPendingProjects] = useState([]);

    const loadPending = async () => {
        try {
            const data = await getPendingProjects();
            setPendingProjects(data);
        } catch {
            toast.error('Failed to load pending projects');
        }
    };

    useEffect(() => {
        loadPending();
    }, []);

    const handleApprove = async (projectId) => {
        try {
            await approveProject(projectId);
            toast.success('Project approved');
            loadPending();
        } catch {
            toast.error('Approval failed');
        }
    };

    return (
        <PageTransition>
            <div>
                <h2 className="text-2xl font-extrabold">Admin Panel</h2>
                <p className="mt-1 text-slate-400">Review and approve newly uploaded projects.</p>
                {pendingProjects.length === 0 ? <p className="mt-3 text-slate-400">No pending projects.</p> : null}
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {pendingProjects.map((project) => (
                        <div key={project._id} className="rounded-2xl border border-slate-700 bg-card p-4">
                            <h3 className="text-lg font-semibold">{project.title}</h3>
                            <p className="mt-2 text-sm text-slate-300">By: {project.uploadedBy?.name}</p>
                            <p className="text-sm text-slate-300">Category: {project.category}</p>
                            <button className="mt-4 rounded-xl bg-secondary px-4 py-2 font-semibold text-slate-900 transition hover:bg-emerald-400" onClick={() => handleApprove(project._id)}>Approve</button>
                        </div>
                    ))}
                </div>
            </div>
        </PageTransition>
    );
}

export default AdminPanel;
