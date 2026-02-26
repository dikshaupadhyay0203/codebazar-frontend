import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import PageTransition from './components/PageTransition';
import FloatingChatbot from './components/FloatingChatbot';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
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
    const location = useLocation();

    return (
        <>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />

                    <Route
                        element={
                            <ProtectedRoute>
                                <DashboardLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/projects/:projectId" element={<ProjectDetails />} />
                        <Route path="/buy/:projectId" element={<BuyProject />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/my-purchases" element={<MyPurchases />} />
                        <Route path="/my-uploads" element={<ProtectedRoute roles={['creator', 'admin']}><MyUploads /></ProtectedRoute>} />
                        <Route path="/upload" element={<ProtectedRoute roles={['creator', 'admin']}><UploadProject /></ProtectedRoute>} />
                        <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminPanel /></ProtectedRoute>} />
                    </Route>

                    <Route path="*" element={<PageTransition><Navigate to="/" replace /></PageTransition>} />
                </Routes>
            </AnimatePresence>
            <FloatingChatbot />
        </>
    );
}

export default App;
