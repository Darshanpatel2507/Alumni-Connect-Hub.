import React, { useEffect, useState } from 'react';
import { postService } from '../services/api';
import { Trash2 } from 'lucide-react';

const PostManagement = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await postService.getPosts();
      setPosts(data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this post?')) {
      try {
        await postService.deletePost(id);
        setPosts(posts.filter(p => p._id !== id));
      } catch (err) {
        alert('Failed to delete post');
      }
    }
  };

  return (
    <div>
      <h1 className="page-title">Post Management</h1>
      
      <div className="card">
        {loading ? (
          <div>Loading posts...</div>
        ) : posts.length === 0 ? (
          <p className="empty-state">No posts created yet.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Author</th>
                <th>Content Snippet</th>
                <th>Likes/Comments</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post._id}>
                  <td>
                    <strong>{post.author?.name || 'Unknown User'}</strong>
                    <div style={{ fontSize: '0.8rem', color: '#666' }}>
                      {post.author?.role || ''}
                    </div>
                  </td>
                  <td style={{ maxWidth: '300px' }}>
                    <div className="truncate">
                      {post.content}
                    </div>
                  </td>
                  <td>
                    👍 {post.likes?.length || 0} &nbsp;&nbsp; 💬 {post.comments?.length || 0}
                  </td>
                  <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button 
                      onClick={() => handleDelete(post._id)} 
                      className="btn-icon btn-reject"
                      title="Delete Post"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PostManagement;
