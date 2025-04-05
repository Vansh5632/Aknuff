import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiUsers, HiDocumentText, HiChartBar } from 'react-icons/hi';
import AdminStats from '../components/AdminStats';
import UserManagement from '../components/UserManagement';
import PostManagement from '../components/PostManagement';

function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, posts: 0 });
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await response.json();
      setStats(data);
    };
    fetchStats();
  }, []);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <HiChartBar className="w-5 h-5" /> },
    { id: 'users', name: 'Users', icon: <HiUsers className="w-5 h-5" /> },
    { id: 'posts', name: 'Posts', icon: <HiDocumentText className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-blue-100">Manage your platform's users and content</p>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8 border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center pb-4 px-1 ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon}
                <span className="ml-2">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Platform Overview</h2>
            <AdminStats stats={stats} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <UserManagement compact={true} />
              <PostManagement compact={true} />
            </div>
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">User Management</h2>
            <UserManagement />
          </motion.div>
        )}

        {activeTab === 'posts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Post Management</h2>
            <PostManagement />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;