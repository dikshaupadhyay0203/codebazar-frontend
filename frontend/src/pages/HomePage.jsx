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
                        <a href="#home" className="text-xl font-extrabold text-primary">CodeBazar</a>
                        <div className="hidden items-center gap-6 md:flex">
                            <a href="#home" className="transition hover:text-primary">Home</a>
                            <a href="#about" className="transition hover:text-primary">About</a>
                            <a href="#contact" className="transition hover:text-primary">Contact</a>
                            <Link to="/login" className="transition hover:text-primary">Login</Link>
                            <Link to="/register" className="transition hover:text-primary">Register</Link>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link to="/login" className="rounded-xl border border-slate-600 px-4 py-2 text-sm font-semibold transition hover:border-primary hover:text-primary">Login</Link>
                            <Link to="/register" className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500">Register</Link>
                        </div>
                    </nav>
                </header>

                <section id="home" className="relative overflow-hidden py-24">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/35 via-appbg to-secondary/20" />
                    <div className="container relative">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl"
                        >
                            CodeBazar
                        </motion.h1>
                        <p className="mt-4 max-w-3xl text-xl font-semibold text-slate-200">
                            Discover. Manage. Build. Simplify your project workflow with CodeBazar.
                        </p>
                        <p className="mt-5 max-w-2xl text-slate-300">
                            CodeBazar is a smart project and task management platform that helps users organize their projects, manage tasks efficiently, and track real-time progress through an interactive and secure dashboard.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link to="/register" className="rounded-xl bg-secondary px-6 py-3 font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-emerald-400">
                                Get Started
                            </Link>
                            <Link to="/login" className="rounded-xl border border-slate-500 px-6 py-3 font-semibold transition hover:border-primary hover:text-primary">
                                Login
                            </Link>
                        </div>
                    </div>
                </section>

                <section id="about" className="container py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl border border-slate-700 bg-card p-6"
                    >
                        <h2 className="text-3xl font-bold">About CodeBazar</h2>
                        <p className="mt-4 text-slate-300">
                            CodeBazar is a full-stack web-based project management platform designed to help users manage projects and their associated tasks efficiently in one centralized place.
                        </p>
                        <p className="mt-3 text-slate-300">
                            With CodeBazar, users can create projects, assign tasks, update task status, and monitor completion progress using a visually interactive dashboard. The platform ensures secure access through JWT-based authentication and role-based authorization, making it reliable for both individuals and teams.
                        </p>
                        <p className="mt-3 text-slate-300">
                            Built using the MERN Stack (MongoDB, Express.js, React.js, and Node.js), CodeBazar follows a structured MVC architecture to provide scalable and maintainable workflow management solutions.
                        </p>
                        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
                            <li>Create and manage multiple projects</li>
                            <li>Assign and track tasks</li>
                            <li>Update task status in real-time</li>
                            <li>Monitor progress through dashboards</li>
                            <li>Collaborate with team members effectively</li>
                        </ul>
                    </motion.div>
                </section>

                <section id="features" className="container py-16">
                    <h2 className="text-3xl font-bold">Features</h2>
                    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {[
                            { title: 'Project Management', desc: 'Create, manage, and monitor multiple projects with ease.' },
                            { title: 'Task Tracking', desc: 'Track task progress and update task status efficiently.' },
                            { title: 'Secure Authentication', desc: 'JWT-based login system with protected routes.' },
                            { title: 'Dashboard Analytics', desc: 'Monitor project performance and task completion insights.' }
                        ].map((feature) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.35 }}
                                whileHover={{ y: -6 }}
                                className="rounded-2xl border border-slate-700 bg-card p-5 transition hover:border-primary/60"
                            >
                                <h3 className="text-lg font-semibold">{feature.title}</h3>
                                <p className="mt-2 text-slate-300">{feature.desc}</p>
                            </motion.div>
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
                    <p>© {new Date().getFullYear()} CodeBazar. All rights reserved.</p>
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
