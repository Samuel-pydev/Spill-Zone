import { useState } from 'react';
import AuthPage from './components/pages/AuthPage';
import Feed from './components/pages/Feed';
import Inbox from './components/pages/Inbox';
import SendMessage from './components/pages/SendMessage';
import BottomNav from './components/ButtomNav';
import { LogOut } from 'lucide-react';

function App() {
  // Auth state - controls if you're logged in or not
  const [token, setToken] = useState<string | null>(null);
  
  // Tab state - controls which page you see
  const [activeTab, setActiveTab] = useState('feed');

  // Logout function
  const handleLogout = () => {
    setToken(null);
    setActiveTab('feed');
  };

  // If no token, show login/signup page
  if (!token) {
    return <AuthPage onLoginSuccess={setToken} />;
  }

  // If logged in, show the main app
  return (
    <div className="min-h-screen bg-[#00F0FF] pb-24">
      {/* Header */}
      <div className="max-w-2xl mx-auto p-4 mb-6">
        {/* <div 
          className="bg-[#FF10F0] border-4 border-black p-6 mb-4"
          style={{ boxShadow: '12px 12px 0px #000' }}
        >
          <h1 className="text-4xl font-black text-white">SPILLZONE</h1>
          <p className="text-white font-bold mt-2">Say what you really think. No names attached.</p>
        </div> */}

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="bg-white border-4 border-black px-6 py-3 font-bold flex items-center gap-2 hover:translate-x-1 hover:translate-y-1 transition-all"
          style={{ boxShadow: '6px 6px 0px #000' }}
        >
          <LogOut size={20} strokeWidth={3} />
          LOGOUT
        </button>
      </div>

      {/* Page Content - shows different page based on activeTab */}
      <div className="max-w-2xl mx-auto px-4">
        {activeTab === 'feed' && <Feed token={token} />}
        {activeTab === 'inbox' && <Inbox token={token} />}
        {activeTab === 'send' && <SendMessage token={token} />}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;