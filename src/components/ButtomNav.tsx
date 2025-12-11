import { MessageSquare, Inbox, Send } from 'lucide-react';
import TabButton from './TabButton';

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav = ({ activeTab, onTabChange }: Props) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-black z-50">
      <div className="max-w-2xl mx-auto flex">
        <TabButton 
          icon={<MessageSquare size={20} strokeWidth={3} className="sm:w-6 sm:h-6" />}
          label="FEED"
          isActive={activeTab === 'feed'}
          onClick={() => onTabChange('feed')}
        />
        <TabButton 
          icon={<Inbox size={20} strokeWidth={3} className="sm:w-6 sm:h-6" />}
          label="INBOX"
          isActive={activeTab === 'inbox'}
          onClick={() => onTabChange('inbox')}
        />
        <TabButton 
          icon={<Send size={20} strokeWidth={3} className="sm:w-6 sm:h-6" />}
          label="SEND"
          isActive={activeTab === 'send'}
          onClick={() => onTabChange('send')}
        />
      </div>
    </div>
  );
};

export default BottomNav;