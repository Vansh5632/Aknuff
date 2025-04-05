import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/admin/users/${userId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUsers(users.filter((user) => user._id !== userId));
        toast.success('User deleted successfully');
      } catch (err) {
        toast.error('Failed to delete user');
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">User Management</h3>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user._id} className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">{user.name} ({user.email})</span>
            <button
              onClick={() => deleteUser(user._id)}
              className="text-red-500 hover:text-red-700 font-medium"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManagement;