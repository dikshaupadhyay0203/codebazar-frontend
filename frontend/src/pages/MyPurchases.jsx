import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { downloadPurchasedProject, getMyPurchases } from '../services/projectService';

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
        <div>
            <h2>My Purchases</h2>
            <div className="grid">
                {purchases.map((purchase) => (
                    <div key={purchase._id} className="card">
                        <h3>{purchase.projectId?.title}</h3>
                        <p>Paid: ₹{purchase.amount}</p>
                        <button className="btn btn-accent" onClick={() => handleDownload(purchase.projectId?._id, purchase.projectId?.title)}>
                            Download
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyPurchases;
