import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getMyUploads } from '../services/projectService';
import PageTransition from '../components/PageTransition';

function MyUploads() {
    const [uploads, setUploads] = useState([]);

    useEffect(() => {
        getMyUploads().then(setUploads).catch(() => toast.error('Failed to load uploads'));
    }, []);

    return (
        <PageTransition>
            <div>
                <h2 className="text-2xl font-extrabold">My Uploads</h2>
                {uploads.length === 0 ? <p className="mt-3 text-slate-400">No uploads yet.</p> : null}
                <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {uploads.map((project) => (
                        <div key={project._id} className="rounded-2xl border border-slate-700 bg-card p-4">
                            <h3 className="text-lg font-semibold">{project.title}</h3>
                            <p className="mt-2 text-sm text-slate-300">Status: <span className={`font-semibold ${project.status === 'approved' ? 'text-secondary' : 'text-amber-400'}`}>{project.status}</span></p>
                            <p className="mt-1 text-sm text-slate-300">Price: ₹{project.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </PageTransition>
    );
}

export default MyUploads;
