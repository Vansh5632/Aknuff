import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

function PostManagement() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/products`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await response.json();
        if (response.ok) {
          setPosts(data);
        } else {
          toast.error('Failed to fetch posts');
        }
      } catch (err) {
        toast.error('Error fetching posts');
      }
    };
    fetchPosts();
  }, []);

  const deletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/admin/products/${postId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPosts(posts.filter((post) => post._id !== postId));
        toast.success('Post deleted successfully');
      } catch (err) {
        toast.error('Failed to delete post');
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Post Management</h3>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post._id} className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">
              {post.title} (by {post.user?.name || 'Unknown User'})
            </span>
            <button
              onClick={() => deletePost(post._id)}
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

export default PostManagement;