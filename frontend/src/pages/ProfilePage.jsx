import { useAuth } from '../hooks/useAuth';
import PageTransition from '../components/PageTransition';

function ProfilePage() {
    const { user } = useAuth();

    return (
        <PageTransition>
            <div className="mx-auto max-w-2xl rounded-2xl border border-slate-700 bg-card p-6">
                <h2 className="text-2xl font-extrabold">Profile</h2>
                <div className="mt-5 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-700 bg-slate-900 p-3"><p className="text-slate-400">Name</p><p className="font-semibold">{user?.name}</p></div>
                    <div className="rounded-xl border border-slate-700 bg-slate-900 p-3"><p className="text-slate-400">Email</p><p className="font-semibold">{user?.email}</p></div>
                    <div className="rounded-xl border border-slate-700 bg-slate-900 p-3"><p className="text-slate-400">Role</p><p className="font-semibold capitalize">{user?.role}</p></div>
                    <div className="rounded-xl border border-slate-700 bg-slate-900 p-3"><p className="text-slate-400">Joined</p><p className="font-semibold">{user?.createdAt ? new Date(user.createdAt).toLocaleString() : '-'}</p></div>
                </div>
            </div>
        </PageTransition>
    );
}

export default ProfilePage;
