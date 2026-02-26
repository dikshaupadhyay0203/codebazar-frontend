import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getMyUploads } from '../services/projectService';

function MyUploads() {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    getMyUploads().then(setUploads).catch(() => toast.error('Failed to load uploads'));
  }, []);

  return (
    <div>
      <h2>My Uploads</h2>
      <div className="grid">
        {uploads.map((project) => (
          <div key={project._id} className="card">
            <h3>{project.title}</h3>
            <p>Status: {project.status}</p>
            <p>Price: ₹{project.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyUploads;
