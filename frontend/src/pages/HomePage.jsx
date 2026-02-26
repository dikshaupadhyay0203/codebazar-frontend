import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import PageTransition from '../components/PageTransition';

function HomePage() {
    const submitContact = (event) => {
        event.preventDefault();
        toast.success('Thanks! We will contact you soon.');
        event.target.reset();
    };

    return (
        <PageTransition>
            <div className="min-h-screen bg-appbg text-textmain">
                <header className="sticky top-0 z-40 border-b border-slate-700/60 bg-appbg/90 backdrop-blur">
                    <nav className="container flex items-center justify-between py-4">
                        <a href="#home" className="text-xl font-extrabold text-primary">CodeBazaar</a>
                        <div className="hidden items-center gap-6 md:flex">
                            <a href="#home" className="transition hover:text-primary">Home</a>
                            <a href="#about" className="transition hover:text-primary">About</a>
                            <a href="#features" className="transition hover:text-primary">Features</a>
                            <a href="#contact" className="transition hover:text-primary">Contact</a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link to="/login" className="rounded-xl border border-slate-600 px-4 py-2 text-sm font-semibold transition hover:border-primary hover:text-primary">Login</Link>
                            <Link to="/register" className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500">Register</Link>
                        </div>
                    </nav>
                </header>

                <section id="home" className="relative overflow-hidden py-20">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/35 via-appbg to-secondary/20" />
                    <div className="container relative">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl"
                        >
                            Build, Sell, and Buy Developer Projects in a Modern Marketplace
                        </motion.h1>
                        <p className="mt-5 max-w-2xl text-slate-300">
                            CodeBazaar is a SaaS-style platform where creators upload production-ready code projects and buyers instantly purchase secure downloadable assets.
                        </p>
                        <Link to="/register" className="mt-8 inline-block rounded-xl bg-secondary px-6 py-3 font-semibold text-slate-900 transition hover:scale-[1.02] hover:bg-emerald-400">
                            Get Started
                        </Link>
                    </div>
                </section>

                <section id="about" className="container py-16">
                    <h2 className="text-3xl font-bold">About</h2>
                    <p className="mt-4 max-w-3xl text-slate-300">
                        CodeBazaar helps developers monetize quality software by listing complete projects, and gives buyers a fast way to discover, evaluate, and purchase solutions for real-world needs.
                    </p>
                </section>

                <section id="features" className="container py-16">
                    <h2 className="text-3xl font-bold">Features</h2>
                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        {[
                            { title: 'Project Management', desc: 'Manage uploads, approvals, and creator dashboards from one workspace.' },
                            { title: 'Task Tracking', desc: 'Track progress through project lifecycle with clear status and delivery flow.' },
                            { title: 'AI Assistant', desc: 'Get project recommendations, pricing guidance, and stack comparisons instantly.' }
                        ].map((feature) => (
                            <div key={feature.title} className="rounded-2xl border border-slate-700 bg-card p-5 transition hover:-translate-y-1 hover:border-primary/60">
                                <h3 className="text-lg font-semibold">{feature.title}</h3>
                                <p className="mt-2 text-slate-300">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="contact" className="container py-16">
                    <h2 className="text-3xl font-bold">Contact</h2>
                    <form onSubmit={submitContact} className="mt-6 grid gap-3 rounded-2xl border border-slate-700 bg-card p-6 md:grid-cols-2">
                        <input className="input" placeholder="Name" required />
                        <input className="input" placeholder="Email" type="email" required />
                        <textarea className="input md:col-span-2" rows={4} placeholder="Message" required />
                        <button className="btn-accent md:col-span-2" type="submit">Send Message</button>
                    </form>
                </section>

                <footer className="border-t border-slate-700/60 py-8 text-center text-sm text-slate-400">
                    <p>© {new Date().getFullYear()} CodeBazaar. All rights reserved.</p>
                    <div className="mt-2 flex justify-center gap-4">
                        <Link to="/about" className="hover:text-primary">About Page</Link>
                        <Link to="/contact" className="hover:text-primary">Contact Page</Link>
                    </div>
                </footer>
            </div>
        </PageTransition>
    );
}

export default HomePage;
