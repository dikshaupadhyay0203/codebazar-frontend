import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function ProjectCard({ project }) {
    return (
        <motion.div whileHover={{ y: -4 }} className="rounded-2xl border border-slate-700 bg-card p-4 transition">
            {project.imageUrl ? (
                <img src={project.imageUrl} alt={project.title} className="h-44 w-full rounded-xl object-cover" />
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
