import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { approveProject, getPendingProjects } from '../services/projectService';

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
    <div>
      <h2>Admin Panel</h2>
      <div className="grid">
        {pendingProjects.map((project) => (
          <div key={project._id} className="card">
            <h3>{project.title}</h3>
            <p>By: {project.uploadedBy?.name}</p>
            <p>Category: {project.category}</p>
            <button className="btn btn-accent" onClick={() => handleApprove(project._id)}>Approve</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;
