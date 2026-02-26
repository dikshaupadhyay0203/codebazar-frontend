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
            <div className="min-h-screen bg-appbg text-textmain">
                <div className="container py-16">
                    <h1 className="text-4xl font-extrabold">Contact Us</h1>
                    <p className="mt-3 text-slate-300">Have feedback or partnership ideas? We would love to hear from you.</p>

                    <form onSubmit={onSubmit} className="mt-8 grid gap-3 rounded-2xl border border-slate-700 bg-card p-6 md:max-w-2xl">
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
