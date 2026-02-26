import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getMyUploads } from '../services/projectService';
import PageTransition from '../components/PageTransition';

const apiOrigin = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000/api').replace(/\/api\/?$/, '');

const encodePathname = (pathname) =>
    pathname
        .split('/')
        .map((segment, index) => {
            if (index === 0) return segment;
            try {
                return encodeURIComponent(decodeURIComponent(segment));
            } catch {
                return encodeURIComponent(segment);
            }
        })
        .join('/');

const resolveImageUrl = (rawUrl) => {
    if (!rawUrl) return '';

    try {
        const parsed = new URL(rawUrl);
        return `${apiOrigin}${encodePathname(parsed.pathname)}${parsed.search || ''}`;
    } catch {
        return rawUrl;
    }
};

function MyUploads() {
    const [uploads, setUploads] = useState([]);
    const [failedImageIds, setFailedImageIds] = useState({});

    useEffect(() => {
        getMyUploads().then(setUploads).catch(() => toast.error('Failed to load uploads'));
    }, []);

    return (
        <PageTransition>
            <div>
                <h2 className="text-2xl font-extrabold">My Uploads</h2>
                {uploads.length === 0 ? <p className="mt-3 text-textmuted">No uploads yet.</p> : null}
                <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {uploads.map((project) => (
                        <div key={project._id} className="card card-hover p-4">
                            {resolveImageUrl(project.imageUrl) && !failedImageIds[project._id] ? (
                                <img
                                    src={resolveImageUrl(project.imageUrl)}
                                    alt={project.title}
                                    className="mb-3 h-40 w-full rounded-xl object-cover"
                                    onError={() => setFailedImageIds((prev) => ({ ...prev, [project._id]: true }))}
                                />
                            ) : null}
                            <h3 className="text-lg font-semibold">{project.title}</h3>
                            <p className="mt-2 text-sm text-slate-300">Status: <span className={`font-semibold ${project.status === 'approved' ? 'text-primary' : 'text-amber-400'}`}>{project.status}</span></p>
                            <p className="mt-1 text-sm text-slate-300">Price: ₹{project.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </PageTransition>
    );
}

export default MyUploads;
