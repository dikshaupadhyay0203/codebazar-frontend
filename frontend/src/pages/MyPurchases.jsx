import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { downloadPurchasedProject, getMyPurchases, getPurchasedProjectAssets } from '../services/projectService';
import PageTransition from '../components/PageTransition';

function MyPurchases() {
    const [purchases, setPurchases] = useState([]);
    const [assetsByProject, setAssetsByProject] = useState({});

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

    const handleUnlockAssets = async (projectId) => {
        try {
            const assets = await getPurchasedProjectAssets(projectId);
            setAssetsByProject((prev) => ({ ...prev, [projectId]: assets }));
            toast.success('Project assets unlocked');
        } catch (apiError) {
            toast.error(apiError.response?.data?.message || 'Unable to unlock assets');
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
                            {assetsByProject[purchase.projectId?._id]?.projectLink ? (
                                <a
                                    href={assetsByProject[purchase.projectId?._id].projectLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-3 inline-block text-sm font-semibold text-secondary hover:underline"
                                >
                                    Open Project Link
                                </a>
                            ) : (
                                <button
                                    className="mt-3 block rounded-lg border border-slate-600 px-3 py-1.5 text-sm font-semibold text-slate-200 transition hover:border-primary hover:text-primary"
                                    onClick={() => handleUnlockAssets(purchase.projectId?._id)}
                                >
                                    Unlock Project Link
                                </button>
                            )}
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
