interface Props {
  id: number;
  text: string;
  timestamp: string;
  canDelete?: boolean;
  onDelete?: (id: number) => void;
  reactionCounts?: { [emoji: string]: number };  // ADD THIS
  userReactions?: string[];  // ADD THIS
  onReact?: (postId: number, emoji: string) => void;  // ADD THIS
}

const PostCard = ({ 
  id, 
  text, 
  timestamp, 
  canDelete = false, 
  onDelete,
  reactionCounts = {},
  userReactions = [],
  onReact
}: Props) => {
  const emojis = ['👀', '👍', '💀', '☕'];
  
  return (
    <div 
      className="bg-white border-4 border-black p-6"
      style={{ boxShadow: '6px 6px 0px #000' }}
    >
      <div className="flex justify-between items-start mb-2">
        <p className="text-lg font-bold flex-1">{text}</p>
        {canDelete && onDelete && (
          <button
            onClick={() => onDelete(id)}
            className="ml-4 bg-red-500 text-white px-3 py-1 border-2 border-black font-bold text-sm hover:bg-red-600"
          >
            DELETE
          </button>
        )}
      </div>
      
      <span className="text-sm font-bold text-gray-600 mb-3 block">{timestamp}</span>
      
      {/* Reactions */}
      {onReact && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {emojis.map((emoji) => {
            const count = reactionCounts[emoji] || 0;
            const isActive = userReactions.includes(emoji);
            
            return (
              <button
                key={emoji}
                onClick={() => onReact(id, emoji)}
                className={`px-3 py-1 border-2 border-black font-bold text-sm transition-all ${
                  isActive 
                    ? 'bg-[#FFE951] translate-x-[2px] translate-y-[2px]' 
                    : 'bg-white hover:translate-x-[1px] hover:translate-y-[1px]'
                }`}
                style={{ 
                  boxShadow: isActive ? '2px 2px 0px #000' : '4px 4px 0px #000' 
                }}
              >
                <span className="text-lg">{emoji}</span>
                {count > 0 && <span className="ml-1">{count}</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PostCard;
