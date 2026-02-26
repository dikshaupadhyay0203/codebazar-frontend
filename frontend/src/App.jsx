import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UploadProject from './pages/UploadProject';
import ProjectDetails from './pages/ProjectDetails';
import BuyProject from './pages/BuyProject';
import ProfilePage from './pages/ProfilePage';
import MyPurchases from './pages/MyPurchases';
import MyUploads from './pages/MyUploads';
import AdminPanel from './pages/AdminPanel';

function App() {
    return (
        <>
            <Navbar />
            <div className="container" style={{ padding: '1rem 0 2rem' }}>
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />

                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/projects/:projectId" element={<ProjectDetails />} />
                    <Route path="/buy/:projectId" element={<ProtectedRoute><BuyProject /></ProtectedRoute>} />

                    <Route path="/upload" element={<ProtectedRoute roles={['creator', 'admin']}><UploadProject /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                    <Route path="/my-purchases" element={<ProtectedRoute><MyPurchases /></ProtectedRoute>} />
                    <Route path="/my-uploads" element={<ProtectedRoute roles={['creator', 'admin']}><MyUploads /></ProtectedRoute>} />
                    <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminPanel /></ProtectedRoute>} />
                </Routes>
            </div>
        </>
    );
}

export default App;
