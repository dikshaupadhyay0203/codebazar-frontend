import { useAuth } from '../hooks/useAuth';

function ProfilePage() {
    const { user } = useAuth();

    return (
        <div className="card" style={{ maxWidth: 600 }}>
            <h2>Profile</h2>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>
            <p><strong>Joined:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleString() : '-'}</p>
        </div>
    );
}

export default ProfilePage;
