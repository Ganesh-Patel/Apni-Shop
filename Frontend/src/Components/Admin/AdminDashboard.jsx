import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function AdminDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleCloseSidebar = () => {
        if (isSidebarOpen) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className="flex  h-screen top-0">
            {/* Sidebar */}
            <div className={`fixed z-10 bg-gray-800 h-screen transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 w-64 top-0`}>
                <div className="flex flex-col h-full text-white">
                    <div className="p-4 text-2xl font-bold bg-teal-900 flex justify-between items-center">
                        Admin Dashboard
                        <button onClick={handleCloseSidebar} className="text-xl">
                            <FaTimes />
                        </button>
                    </div>
                    <nav className="mt-10 flex-grow">
                        {['AdminOrders', 'Users', 'Products', 'Coupons', 'Sales', 'Settings'].map((item) => (
                            <Link
                                to={`/${item.toLowerCase()}`}
                                key={item}
                                className="block p-4 hover:bg-teal-700 transition-colors duration-200"
                                onClick={handleCloseSidebar}
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className={`flex-1 transition-all h-screen duration-300 ml-0 ${isSidebarOpen ? 'md:ml-64' : ''}`}>

                <div
                    className=" flex items-center justify-center h-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20211118/pngtree-technology-round-dashboard-image_908915.jpg')" }}
                >
                    <h2 className="text-3xl font-bold text-white">Welcome to the Admin Dashboard</h2>
                </div>
            </div>

            {/* Overlay to close sidebar when clicking outside */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-5 md:hidden"
                    onClick={handleCloseSidebar}
                ></div>
            )}
        </div>
    );
}

export default AdminDashboard;
