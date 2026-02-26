import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

function AboutPage() {
    return (
        <PageTransition>
            <div className="min-h-screen bg-appbg text-textmain">
                <header className="sticky top-0 z-40 border-b border-slate-700/60 bg-appbg/90 backdrop-blur">
                    <nav className="container flex items-center justify-between py-4">
                        <Link to="/" className="text-xl font-extrabold text-primary">CodeBazar</Link>
                        <div className="flex items-center gap-6 text-sm md:text-base">
                            <Link to="/" className="transition hover:text-primary">Home</Link>
                            <a href="#about-content" className="transition hover:text-primary">About</a>
                            <Link to="/contact" className="transition hover:text-primary">Contact</Link>
                            <Link to="/login" className="transition hover:text-primary">Login</Link>
                            <Link to="/register" className="transition hover:text-primary">Register</Link>
                        </div>
                    </nav>
                </header>
                <div className="container py-16">
                    <h1 id="about-content" className="text-4xl font-extrabold">About CodeBazar</h1>
                    <p className="mt-6 max-w-3xl text-slate-300">
                        CodeBazar is a full-stack web-based project management platform designed to help users manage projects and their associated tasks efficiently in one centralized place.
                    </p>
                    <p className="mt-4 max-w-3xl text-slate-300">
                        With CodeBazar, users can create projects, assign tasks, update task status, and monitor completion progress using a visually interactive dashboard. The platform ensures secure access through JWT-based authentication and role-based authorization, making it reliable for both individuals and teams.
                    </p>
                    <div className="mt-8 rounded-2xl border border-slate-700 bg-card p-6">
                        <h2 className="text-xl font-semibold">Built with MERN + MVC</h2>
                        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
                            <li>Create and manage multiple projects</li>
                            <li>Assign and track tasks</li>
                            <li>Update task status in real-time</li>
                            <li>Monitor progress through dashboards</li>
                            <li>Collaborate with team members effectively</li>
                        </ul>
                    </div>
                    <Link to="/" className="mt-8 inline-block rounded-xl bg-primary px-5 py-2 font-semibold text-white transition hover:bg-indigo-500">Back to Home</Link>
                </div>
            </div>
        </PageTransition>
    );
}

export default AboutPage;
