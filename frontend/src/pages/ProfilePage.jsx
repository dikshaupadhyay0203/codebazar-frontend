import { useAuth } from '../hooks/useAuth';
import PageTransition from '../components/PageTransition';

function ProfilePage() {
    const { user } = useAuth();

    return (
        <PageTransition>
            <div className="card mx-auto max-w-2xl p-6">
                <h2 className="text-2xl font-extrabold">Profile</h2>
                <div className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3"><p className="text-textmuted">Name</p><p className="font-semibold">{user?.name}</p></div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3"><p className="text-textmuted">Email</p><p className="font-semibold">{user?.email}</p></div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3"><p className="text-textmuted">Role</p><p className="font-semibold capitalize">{user?.role}</p></div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3"><p className="text-textmuted">Joined</p><p className="font-semibold">{user?.createdAt ? new Date(user.createdAt).toLocaleString() : '-'}</p></div>
                </div>
            </div>
        </PageTransition>
    );
}

export default ProfilePage;
