import { Link } from 'react-router-dom';

function ProjectCard({ project }) {
  return (
    <div className="card">
      {project.imageUrl ? (
        <img src={project.imageUrl} alt={project.title} style={{ width: '100%', borderRadius: 10, height: 170, objectFit: 'cover' }} />
      ) : null}
      <h3>{project.title}</h3>
      <p>{project.description.slice(0, 120)}...</p>
      <p><strong>₹{project.price}</strong></p>
      <p>{project.techStack?.join(', ')}</p>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Link className="btn btn-muted" to={`/projects/${project._id}`}>Details</Link>
        <Link className="btn btn-accent" to={`/buy/${project._id}`}>Buy</Link>
      </div>
    </div>
  );
}

export default ProjectCard;
