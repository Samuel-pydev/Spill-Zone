import { useState, useEffect } from 'react';
import MessageCard from '../MessageCard';

interface Props {
  token: string;
}

interface Message {
  id: number;
  text: string;
  sender_username: string | null;
  is_anonymous: boolean;
  timestamp: string;
}

const Inbox = ({ token }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL
  // const API_URL = "http://127.0.0.1:8000"

  useEffect(() => {
    loadInbox();
  }, []);

  const loadInbox = async () => {
    try {
      const response = await fetch(`${API_URL}/messages/inbox`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading inbox:', error);
      setLoading(false);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp + 'Z' );
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  if (loading) {
    return (
      <div 
        className="bg-white border-4 border-black p-8 text-center"
        style={{ boxShadow: '6px 6px 0px #000' }}
      >
        <p className="font-bold text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div 
        className="bg-[#FF10F0] border-4 border-black p-6"
        style={{ boxShadow: '8px 8px 0px #000' }}
      >
        <h2 className="text-3xl font-black text-white">YOUR INBOX</h2>
      </div>

      {messages.length === 0 ? (
        <div 
          className="bg-white border-4 border-black p-8 text-center"
          style={{ boxShadow: '6px 6px 0px #000' }}
        >
          <p className="font-bold text-lg">No messages yet. Share your username! 📬</p>
        </div>
      ) : (
        messages.map((msg) => (
          <MessageCard
            key={msg.id}
            text={msg.text}
            timestamp={formatTime(msg.timestamp)}
            isAnonymous={msg.is_anonymous}
            senderUsername={msg.sender_username || undefined}
          />
        ))
      )}
    </div>
  );
};

export default Inbox;
