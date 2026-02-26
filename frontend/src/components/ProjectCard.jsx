import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

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

function ProjectCard({ project }) {
    const [imageFailed, setImageFailed] = useState(false);
    const imageUrl = resolveImageUrl(project.imageUrl);

    return (
        <motion.div whileHover={{ y: -4 }} className="rounded-2xl border border-slate-700 bg-card p-4 transition">
            {imageUrl && !imageFailed ? (
                <img src={imageUrl} alt={project.title} className="h-44 w-full rounded-xl object-cover" onError={() => setImageFailed(true)} />
            ) : null}
            <h3 className="mt-3 text-lg font-semibold">{project.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{project.description.slice(0, 120)}...</p>
            <p className="mt-3 text-lg font-bold text-secondary">₹{project.price}</p>
            <p className="mt-1 text-xs text-slate-400">{project.techStack?.join(', ')}</p>
            <div className="mt-4 flex gap-2">
                <Link className="btn-muted" to={`/projects/${project._id}`}>Details</Link>
                <Link className="btn-accent" to={`/buy/${project._id}`}>Buy</Link>
            </div>
        </motion.div>
    );
}

export default ProjectCard;
