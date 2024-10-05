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
        <div className="flex h-screen mt-8">
            {/* Sidebar */}
            <div className={`fixed z-10 bg-gray-700 h-[calc(100vh-2rem)] mt-8 w-64 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
                <div className="flex flex-col h-full text-white">
                    <div className="p-4 text-2xl font-bold bg-teal-900 flex justify-between items-center">
                        Admin Dashboard
                        <button onClick={handleCloseSidebar} className="md:hidden">
                            <FaTimes />
                        </button>
                    </div>
                    <nav className="mt-10 flex-grow">
                        {['Orders', 'Users', 'Products','Coupons', 'Sales', 'Settings'].map((item) => (
                            <Link
                                to={`/${item.toLowerCase()}`}
                                key={item}
                                className="block p-4 hover:bg-teal-700"
                                onClick={handleCloseSidebar}
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : ''}`}>
                <div className="flex items-center justify-between p-4 bg-white shadow-md">
                    <button
                        className="text-gray-700 md:hidden"
                        onClick={toggleSidebar}
                    >
                        {isSidebarOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                    </button>
                </div>

                <div className="p-4 flex justify-center items-center h-full">
                    <h2 className="text-3xl text-gray-700">Welcome to the Admin Dashboard</h2>
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
