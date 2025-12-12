import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Buttons';

interface Props {
  token: string;
}

const SendMessage = ({ token }: Props) => {
  const [recipientUsername, setRecipientUsername] = useState('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [usernameExists, setUsernameExists] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL
  // const API_URL = "http://127.0.0.1:8000"

  const checkUsername = async (username: string) => {
    if (!username.trim()) {
      setUsernameExists(null);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/user/${username}`);
      const data = await response.json();
      setUsernameExists(data.exists);
    } catch (error) {
      console.error('Error checking username:', error);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRecipientUsername(value);
    checkUsername(value);
  };

  const handleSend = async () => {
    if (!message.trim() || !recipientUsername.trim() || usernameExists !== true) return;

    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/messages/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          recipient_username: recipientUsername,
          text: message,
          is_anonymous: isAnonymous
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || 'Failed to send message');
        setLoading(false);
        return;
      }

      // Success - reset form
      setMessage('');
      setRecipientUsername('');
      setUsernameExists(null);
      alert('Message sent! 🚀');
    } catch (error) {
      setError('Connection error');
    }
    setLoading(false);
  };

  return (
    <div>
      <div 
        className="bg-[#00F0FF] border-4 border-black p-6 mb-6"
        style={{ boxShadow: '8px 8px 0px #000' }}
      >
        <h2 className="text-3xl font-black">SEND MESSAGE</h2>
      </div>

      <div 
        className="bg-white border-4 border-black p-6"
        style={{ boxShadow: '8px 8px 0px #000' }}
      >
        <div className="mb-6">
          <Input
            label="TO USERNAME:"
            value={recipientUsername}
            onChange={handleUsernameChange}
            placeholder="e.g. gi.Joe's"
          />
          
          {usernameExists === true && (
            <div className="bg-green-400 text-black p-2 font-bold mt-2 border-2 border-black">
              ✓ User found!
            </div>
          )}
          {usernameExists === false && (
            <div className="bg-red-400 text-black p-2 font-bold mt-2 border-2 border-black">
              ✗ User not found
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block font-black text-lg mb-2">YOUR MESSAGE:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Say what's on your mind..."
            className="w-full border-4 border-black p-4 font-bold text-lg resize-none focus:outline-none"
            rows={6}
            style={{ boxShadow: 'inset 4px 4px 0px rgba(0,0,0,0.2)' }}
          />
        </div>

        <div className="flex items-center gap-3 mb-6">
          <input
            type="checkbox"
            id="reveal"
            checked={!isAnonymous}
            onChange={(e) => setIsAnonymous(!e.target.checked)}
            className="w-6 h-6 border-4 border-black"
          />
          <label htmlFor="reveal" className="font-bold text-lg">
            Reveal my identity
          </label>
        </div>

        {error && (
          <div className="bg-red-500 text-white p-3 font-bold mb-4 border-4 border-black">
            {error}
          </div>
        )}

        <Button
          text={loading ? 'SENDING...' : 'SEND MESSAGE'}
          onClick={handleSend}
          disabled={loading || !message.trim() || usernameExists !== true}
        />
      </div>
    </div>
  );
};

export default SendMessage;