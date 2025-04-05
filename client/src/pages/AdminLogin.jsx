import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { HiLockClosed, HiUser } from 'react-icons/hi';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await login(username, password, false, null, true); // isAdmin = true
      toast.success('Login successful');
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      toast.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-white text-4xl font-bold mb-2">Admin Portal</h1>
          <p className="text-blue-200">Sign in to access admin dashboard</p>
        </div>
      
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Login</h2>
            
            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-center">
                <span className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-500">!</span>
                <span className="ml-3">{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 block w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiLockClosed className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 block w-full py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </div>
          
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-600">
              Protected area. Authorized personnel only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;