import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import PageTransition from '../components/PageTransition';

function ContactPage() {
    const onSubmit = (event) => {
        event.preventDefault();
        toast.success('Message sent successfully');
        event.target.reset();
    };

    return (
        <PageTransition>
            <div className="relative isolate min-h-screen bg-appbg text-textmain before:pointer-events-none before:absolute before:inset-0 before:bg-[url('/noise.png')] before:opacity-[0.04] before:content-['']">
                <div className="pointer-events-none absolute inset-0 z-[-1]">
                    <div className="absolute left-[-100px] top-[-100px] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[-100px] right-[-100px] h-[600px] w-[600px] rounded-full bg-indigo-600/20 blur-[150px] animate-pulse delay-2000 [animation-delay:2s]" />
                    <div className="absolute left-[30%] top-[40%] h-[400px] w-[400px] rounded-full bg-fuchsia-600/20 blur-[140px] animate-pulse delay-1000 [animation-delay:1s]" />
                </div>
                <header className="sticky top-0 z-40 border-b border-slate-700/60 bg-appbg/90 backdrop-blur">
                    <nav className="container flex items-center justify-between py-4">
                        <Link to="/" className="text-xl font-extrabold text-primary">CodeBazar</Link>
                        <div className="flex items-center gap-6 text-sm md:text-base">
                            <Link to="/" className="transition hover:text-primary">Home</Link>
                            <Link to="/about" className="transition hover:text-primary">About</Link>
                            <a href="#contact-form" className="transition hover:text-primary">Contact</a>
                            <Link to="/login" className="transition hover:text-primary">Login</Link>
                            <Link to="/register" className="transition hover:text-primary">Register</Link>
                        </div>
                    </nav>
                </header>
                <div className="container py-16">
                    <h1 className="text-4xl font-extrabold">Contact CodeBazar</h1>
                    <p className="mt-3 text-slate-300">Tell us about your project workflow needs, feature requests, or support queries.</p>

                    <form id="contact-form" onSubmit={onSubmit} className="mt-8 grid gap-3 rounded-2xl border border-slate-700 bg-card p-6 md:max-w-2xl">
                        <input className="input" placeholder="Your Name" required />
                        <input className="input" type="email" placeholder="Your Email" required />
                        <textarea className="input" rows={5} placeholder="Your Message" required />
                        <button className="btn-accent" type="submit">Submit</button>
                    </form>

                    <Link to="/" className="mt-8 inline-block rounded-xl border border-slate-600 px-5 py-2 font-semibold transition hover:border-primary hover:text-primary">Back to Home</Link>
                </div>
            </div>
        </PageTransition>
    );
}

export default ContactPage;
