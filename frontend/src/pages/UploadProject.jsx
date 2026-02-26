import { useState } from 'react';
import toast from 'react-hot-toast';
import { uploadProject } from '../services/projectService';
import PageTransition from '../components/PageTransition';

function UploadProject() {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ title: '', description: '', price: '', techStack: '', category: '', projectLink: '', projectZip: null, projectImages: [] });

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const payload = new FormData();
            Object.entries(form).forEach(([key, value]) => {
                if (key === 'projectImages') {
                    value.forEach((file) => payload.append('projectImages', file));
                    return;
                }

                if (value) payload.append(key, value);
            });

            await uploadProject(payload);
            toast.success('Project uploaded and visible to everyone');
            setForm({ title: '', description: '', price: '', techStack: '', category: '', projectLink: '', projectZip: null, projectImages: [] });
        } catch (apiError) {
            toast.error(apiError.response?.data?.message || 'Upload failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageTransition>
            <form className="mx-auto max-w-4xl rounded-2xl border border-slate-700 bg-card p-6" onSubmit={onSubmit}>
                <h2 className="text-2xl font-extrabold">Upload Project</h2>
                <p className="mt-1 text-sm text-slate-400">Upload your project package, images, and optional project link.</p>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                    <input className="input md:col-span-2" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                    <textarea className="input md:col-span-2" rows={5} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
                    <input className="input" type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
                    <input className="input" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
                    <input className="input md:col-span-2" placeholder="Tech Stack (comma separated)" value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })} />
                    <input className="input md:col-span-2" placeholder="Project Link (optional)" value={form.projectLink} onChange={(e) => setForm({ ...form, projectLink: e.target.value })} />

                    <div className="rounded-xl border border-dashed border-slate-600 p-4">
                        <p className="mb-2 text-sm font-semibold">Project ZIP</p>
                        <input className="input" type="file" accept=".zip" onChange={(e) => setForm({ ...form, projectZip: e.target.files?.[0] || null })} required />
                    </div>
                    <div className="rounded-xl border border-dashed border-slate-600 p-4 md:col-span-2">
                        <p className="mb-2 text-sm font-semibold">Additional Images (optional)</p>
                        <input className="input" type="file" accept="image/*" multiple onChange={(e) => setForm({ ...form, projectImages: Array.from(e.target.files || []) })} />
                    </div>
                </div>

                <button className="mt-5 rounded-xl bg-primary px-5 py-2.5 font-semibold text-white transition hover:bg-indigo-500" disabled={loading}>
                    {loading ? 'Uploading...' : 'Upload Project'}
                </button>
            </form>
        </PageTransition>
    );
}

export default UploadProject;
