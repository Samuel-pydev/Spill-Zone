import { useState } from 'react';
import Button from '../ui/Buttons';
import Input from '../ui/Input';

interface Props {
  onLoginSuccess: (token: string) => void;
}

const AuthPage = ({ onLoginSuccess }: Props) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = 'https://spill-zone-bck-v1.onrender.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = authMode === 'login' ? '/login' : '/signup';

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || 'Authentication failed');
        setLoading(false);
        return;
      }

      onLoginSuccess(data.access_token);
    } catch (err) {
      setError('Connection error. Is the backend running?');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#00F0FF] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div 
          className="bg-[#FF10F0] border-4 border-black p-8 mb-6"
          style={{ boxShadow: '12px 12px 0px #000' }}
        >
          <h1 className="text-5xl font-black text-white mb-2">SPILLZONE</h1>
          <p className="text-white font-bold">Say what you really think.</p>
        </div>

        {/* Auth Form */}
        <div 
          className="bg-white border-4 border-black p-8"
          style={{ boxShadow: '8px 8px 0px #000' }}
        >
          {/* Toggle Login/Signup */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-3 px-6 font-black border-4 border-black ${
                authMode === 'login' ? 'bg-[#FFE951]' : 'bg-white'
              }`}
              style={{ boxShadow: '4px 4px 0px #000' }}
            >
              LOGIN
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-3 px-6 font-black border-4 border-black ${
                authMode === 'signup' ? 'bg-[#FFE951]' : 'bg-white'
              }`}
              style={{ boxShadow: '4px 4px 0px #000' }}
            >
              SIGNUP
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. gi.Joe's"
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            {/* Error message */}
            {error && (
              <div className="bg-red-500 text-white p-3 font-bold border-4 border-black">
                {error}
              </div>
            )}

            {/* Submit button */}
            <Button
              text={loading ? 'LOADING...' : authMode === 'login' ? 'LOGIN' : 'CREATE ACCOUNT'}
              type="submit"
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;