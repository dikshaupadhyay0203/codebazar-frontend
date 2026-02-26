import { useState } from 'react';
import toast from 'react-hot-toast';
import { uploadProject } from '../services/projectService';

function UploadProject() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', price: '', techStack: '', category: '', projectZip: null, projectImage: null });

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) payload.append(key, value);
      });

      await uploadProject(payload);
      toast.success('Project uploaded for admin approval');
      setForm({ title: '', description: '', price: '', techStack: '', category: '', projectZip: null, projectImage: null });
    } catch (apiError) {
      toast.error(apiError.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="card" onSubmit={onSubmit}>
      <h2>Upload Project</h2>
      <div className="grid">
        <input className="input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <textarea className="input" rows={4} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <input className="input" type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input className="input" placeholder="Tech Stack (comma separated)" value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })} />
        <input className="input" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
        <input className="input" type="file" accept=".zip" onChange={(e) => setForm({ ...form, projectZip: e.target.files?.[0] || null })} required />
        <input className="input" type="file" accept="image/*" onChange={(e) => setForm({ ...form, projectImage: e.target.files?.[0] || null })} />
        <button className="btn btn-accent" disabled={loading}>{loading ? 'Uploading...' : 'Upload Project'}</button>
      </div>
    </form>
  );
}

export default UploadProject;
