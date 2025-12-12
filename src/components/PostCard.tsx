interface Props {
  id: number;
  text: string;
  timestamp: string;
  canDelete?: boolean;  // Add this
  onDelete?: (id: number) => void;  // Add this
}

const PostCard = ({ id, text, timestamp, canDelete = false, onDelete }: Props) => {
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
      <span className="text-sm font-bold text-gray-600">{timestamp}</span>
    </div>
  );
};

export default PostCard