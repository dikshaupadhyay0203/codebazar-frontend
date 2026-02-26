import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

function AboutPage() {
    return (
        <PageTransition>
            <div className="min-h-screen bg-appbg text-textmain">
                <div className="container py-16">
                    <h1 className="text-4xl font-extrabold">About CodeBazaar</h1>
                    <p className="mt-6 max-w-3xl text-slate-300">
                        CodeBazaar is a modern project marketplace for developers. Creators publish software assets, buyers discover solutions with filters and AI support, and secure payments unlock project downloads.
                    </p>
                    <div className="mt-8 rounded-2xl border border-slate-700 bg-card p-6">
                        <h2 className="text-xl font-semibold">Why teams choose CodeBazaar</h2>
                        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
                            <li>Curated project listings with stack-level filtering</li>
                            <li>Creator-centric upload and approval workflow</li>
                            <li>Secure payment + protected download architecture</li>
                            <li>Built-in AI shopping assistant for faster decisions</li>
                        </ul>
                    </div>
                    <Link to="/" className="mt-8 inline-block rounded-xl bg-primary px-5 py-2 font-semibold text-white transition hover:bg-indigo-500">Back to Home</Link>
                </div>
            </div>
        </PageTransition>
    );
}

export default AboutPage;
