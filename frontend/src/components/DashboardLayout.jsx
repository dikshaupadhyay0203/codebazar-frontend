import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function DashboardLayout() {
    return (
        <div className="min-h-screen bg-appbg text-textmain lg:flex">
            <Sidebar />
            <main className="w-full p-4 lg:p-8">
                <Outlet />
            </main>
        </div>
    );
}

export default DashboardLayout;
