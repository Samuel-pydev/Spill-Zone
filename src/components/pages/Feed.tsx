import { useState, useEffect } from 'react';
import PostCard from '../PostCard';
import Button from '../ui/Buttons';

interface Props {
  token: string;
}

interface Post {
  id: number;
  user_id: number | null;
  text: string;
  timestamp: string;
}

const Feed = ({ token }: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  
  const MAX_POST_LENGTH = 500;  // Character limit
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    loadFeed();
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setCurrentUserId(data.id);
    } catch (error) {
      console.error('Error getting user:', error);
    }
  };

  const loadFeed = async () => {
    try {
      const response = await fetch(`${API_URL}/feed`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error loading feed:', error);
    }
  };

  const handlePost = async () => {
    if (!newPost.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/feed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: newPost })
      });

      if (response.ok) {
        setNewPost('');
        loadFeed();
      }
    } catch (error) {
      console.error('Error posting:', error);
    }
    setLoading(false);
  };

  const handleDeletePost = async (postId: number) => {
    if (!confirm('Delete this post? This cannot be undone.')) return;
    
    try {
      const response = await fetch(`${API_URL}/feed/${postId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        loadFeed();
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp + 'Z');
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="space-y-4">
      {/* Post Form */}
      <div 
        className="bg-[#FFE951] border-4 border-black p-6"
        style={{ boxShadow: '8px 8px 0px #000' }}
      >
        <h2 className="text-2xl font-black mb-4">POST ANONYMOUSLY</h2>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Spill the tea... 👀"
          maxLength={MAX_POST_LENGTH}
          className="w-full border-4 border-black p-4 font-bold text-lg resize-none focus:outline-none"
          rows={4}
          style={{ boxShadow: 'inset 4px 4px 0px rgba(0,0,0,0.2)' }}
        />
        
        {/* Character Counter */}
        <div className="flex justify-end mt-2">
          <span className={`text-sm font-bold ${
            newPost.length > MAX_POST_LENGTH * 0.9 ? 'text-orange-600' : 'text-gray-600'
          }`}>
            {newPost.length}/{MAX_POST_LENGTH}
          </span>
        </div>
        
        <div className="mt-4">
          <Button
            text={loading ? 'POSTING...' : 'POST IT'}
            onClick={handlePost}
            disabled={loading || !newPost.trim() || newPost.length > MAX_POST_LENGTH}
          />
        </div>
      </div>

      {/* Feed Posts */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div 
            className="bg-white border-4 border-black p-8 text-center"
            style={{ boxShadow: '6px 6px 0px #000' }}
          >
            <p className="font-bold text-lg">No posts yet. Be the first to spill! ☕</p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              text={post.text}
              timestamp={formatTime(post.timestamp)}
              canDelete={post.user_id != null && post.user_id === currentUserId}
              onDelete={handleDeletePost}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;
