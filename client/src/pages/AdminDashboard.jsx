import { useEffect, useState } from 'react';
import AdminStats from '../components/AdminStats';
import UserManagement from '../components/UserManagement';
import PostManagement from '../components/PostManagement';

function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, posts: 0 });

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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
      <AdminStats stats={stats} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <UserManagement />
        <PostManagement />
      </div>
    </div>
  );
}

export default AdminDashboard;