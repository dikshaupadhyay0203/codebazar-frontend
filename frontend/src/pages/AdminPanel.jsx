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
                <p className="mt-1 text-textmuted">Review and approve newly uploaded projects.</p>
                {pendingProjects.length === 0 ? <p className="mt-3 text-textmuted">No pending projects.</p> : null}
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {pendingProjects.map((project) => (
                        <div key={project._id} className="card card-hover p-4">
                            <h3 className="text-lg font-semibold">{project.title}</h3>
                            <p className="mt-2 text-sm text-slate-300">By: {project.uploadedBy?.name}</p>
                            <p className="text-sm text-slate-300">Category: {project.category}</p>
                            <button className="btn-accent mt-4" onClick={() => handleApprove(project._id)}>Approve</button>
                        </div>
                    ))}
                </div>
            </div>
        </PageTransition>
    );
}

export default AdminPanel;
