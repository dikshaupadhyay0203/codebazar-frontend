import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { downloadPurchasedProject, getMyPurchases } from '../services/projectService';
import PageTransition from '../components/PageTransition';

function MyPurchases() {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        getMyPurchases().then(setPurchases).catch(() => toast.error('Failed to load purchases'));
    }, []);

    const handleDownload = async (projectId, title) => {
        try {
            const response = await downloadPurchasedProject(projectId);
            const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `${title || 'project'}.zip`;
            link.click();
            window.URL.revokeObjectURL(blobUrl);
        } catch (apiError) {
            toast.error(apiError.response?.data?.message || 'Download failed');
        }
    };

    return (
        <PageTransition>
            <div>
                <h2 className="text-2xl font-extrabold">My Purchases</h2>
                {purchases.length === 0 ? <p className="mt-3 text-slate-400">No purchases yet.</p> : null}
                <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {purchases.map((purchase) => (
                        <div key={purchase._id} className="rounded-2xl border border-slate-700 bg-card p-4">
                            <h3 className="text-lg font-semibold">{purchase.projectId?.title}</h3>
                            <p className="mt-2 text-sm text-slate-300">Paid: ₹{purchase.amount}</p>
                            <button className="mt-4 rounded-xl bg-primary px-4 py-2 font-semibold text-white transition hover:bg-indigo-500" onClick={() => handleDownload(purchase.projectId?._id, purchase.projectId?.title)}>
                                Download
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </PageTransition>
    );
}

export default MyPurchases;
