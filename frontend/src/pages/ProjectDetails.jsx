import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addReview, getProjectDetails } from '../services/projectService';
import { useAuth } from '../hooks/useAuth';
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

function ProjectDetails() {
    const { projectId } = useParams();
    const { isAuthenticated } = useAuth();
    const [data, setData] = useState(null);
    const [review, setReview] = useState({ rating: 5, comment: '' });

    const loadDetails = async () => {
        try {
            const details = await getProjectDetails(projectId);
            setData(details);
        } catch {
            toast.error('Failed to load project details');
        }
    };

    useEffect(() => {
        loadDetails();
    }, [projectId]);

    const submitReview = async (event) => {
        event.preventDefault();
        try {
            await addReview(projectId, { rating: Number(review.rating), comment: review.comment });
            toast.success('Review added');
            setReview({ rating: 5, comment: '' });
            loadDetails();
        } catch (apiError) {
            toast.error(apiError.response?.data?.message || 'Unable to add review');
        }
    };

    if (!data) return <p className="text-slate-300">Loading details...</p>;

    return (
        <PageTransition>
            <div className="grid gap-4 xl:grid-cols-3">
                <section className="rounded-2xl border border-slate-700 bg-card p-6 xl:col-span-2">
                    <h2 className="text-2xl font-extrabold">{data.project.title}</h2>
                    <p className="mt-3 text-slate-300">{data.project.description}</p>

                    {data.project.imageUrl ? (
                        <img src={resolveImageUrl(data.project.imageUrl)} alt={data.project.title} className="mt-4 h-56 w-full rounded-xl object-cover" />
                    ) : null}

                    {data.project.projectImages?.length ? (
                        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {data.project.projectImages.map((imageUrl) => (
                                <img key={imageUrl} src={resolveImageUrl(imageUrl)} alt="Project preview" className="h-32 w-full rounded-xl object-cover" />
                            ))}
                        </div>
                    ) : null}

                    <div className="mt-5 grid gap-2 text-sm text-slate-300 md:grid-cols-2">
                        <p><span className="text-slate-400">Category:</span> {data.project.category}</p>
                        <p><span className="text-slate-400">Tech:</span> {data.project.techStack?.join(', ')}</p>
                        <p><span className="text-slate-400">Price:</span> <span className="font-semibold text-secondary">₹{data.project.price}</span></p>
                    </div>

                    <p className="mt-3 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-300">
                        🔒 Project link and downloadable files are available only after payment.
                    </p>

                    <Link className="mt-5 inline-block rounded-xl bg-primary px-4 py-2 font-semibold text-white transition hover:bg-indigo-500" to={`/buy/${projectId}`}>
                        Buy Project
                    </Link>
                </section>

                <section className="rounded-2xl border border-slate-700 bg-card p-6">
                    <h3 className="text-xl font-semibold">Reviews</h3>
                    <div className="mt-3 max-h-72 space-y-3 overflow-y-auto pr-1">
                        {data.reviews?.length ? data.reviews.map((item) => (
                            <div key={item._id} className="rounded-xl border border-slate-700 bg-slate-900 p-3">
                                <p className="font-semibold">{item.userId?.name} <span className="text-secondary">{item.rating}/5</span></p>
                                <p className="mt-1 text-sm text-slate-300">{item.comment}</p>
                            </div>
                        )) : <p className="text-sm text-slate-400">No reviews yet.</p>}
                    </div>

                    {isAuthenticated ? (
                        <form onSubmit={submitReview} className="mt-4 space-y-2">
                            <h4 className="font-semibold">Add Review</h4>
                            <select className="input" value={review.rating} onChange={(e) => setReview({ ...review, rating: e.target.value })}>
                                {[1, 2, 3, 4, 5].map((rating) => <option key={rating} value={rating}>{rating}</option>)}
                            </select>
                            <textarea className="input" rows={3} value={review.comment} placeholder="Comment" onChange={(e) => setReview({ ...review, comment: e.target.value })} />
                            <button className="btn-accent" type="submit">Submit Review</button>
                        </form>
                    ) : null}
                </section>
            </div>
        </PageTransition>
    );
}

export default ProjectDetails;
