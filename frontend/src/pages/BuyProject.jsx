import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { buyProject, verifyPayment } from '../services/paymentService';
import { getProjectDetails } from '../services/projectService';
import PageTransition from '../components/PageTransition';

function BuyProject() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        getProjectDetails(projectId)
            .then((result) => setProject(result.project))
            .catch(() => toast.error('Failed to load project'));
    }, [projectId]);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) return resolve(true);
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleBuy = async () => {
        setProcessing(true);
        try {
            const scriptReady = await loadRazorpayScript();
            if (!scriptReady) {
                toast.error('Unable to load Razorpay');
                return;
            }

            const order = await buyProject(projectId);

            const razorpay = new window.Razorpay({
                key: order.razorpayKeyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: 'CodeBazaar',
                description: `Purchase ${order.project.title}`,
                order_id: order.orderId,
                handler: async (response) => {
                    await verifyPayment({
                        projectId,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature
                    });
                    toast.success('Payment verified. Download unlocked.');
                    navigate('/my-purchases');
                },
                theme: { color: '#10B981' }
            });

            razorpay.open();
        } catch (apiError) {
            toast.error(apiError.response?.data?.message || 'Payment flow failed');
        } finally {
            setProcessing(false);
        }
    };

    if (!project) return <p className="text-slate-300">Loading...</p>;

    return (
        <PageTransition>
            <div className="card mx-auto max-w-2xl p-6">
                <h2 className="text-2xl font-extrabold">Buy Project</h2>
                <p className="mt-2 text-slate-300">Complete secure payment to unlock project download.</p>

                <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-textmuted">Project</p>
                    <p className="text-lg font-semibold">{project.title}</p>
                    <p className="mt-2 text-sm text-textmuted">Amount</p>
                    <p className="text-2xl font-extrabold text-primary">₹{project.price}</p>
                </div>

                <button className="btn-accent mt-5 px-5 py-3" disabled={processing} onClick={handleBuy}>
                    {processing ? 'Processing...' : 'Pay with Razorpay'}
                </button>
            </div>
        </PageTransition>
    );
}

export default BuyProject;
