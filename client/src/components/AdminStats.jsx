function AdminStats({ stats }) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold text-gray-700">Total Users</h3>
          <p className="text-3xl text-blue-600 mt-2">{stats.users}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold text-gray-700">Total Posts</h3>
          <p className="text-3xl text-blue-600 mt-2">{stats.posts}</p>
        </div>
      </div>
    );
  }
  
  export default AdminStats;