interface Props {
  text: string;
  timestamp: string; // or Date
}

const PostCard = ({ text, timestamp }: Props) => {
  return (
    <div 
      className=" max-w-2xl mx-auto my-2 ring-2 ring-black bg-white border-4 border-black p-6"
      style={{ boxShadow: '6px 6px 0px #000' }}
    >
      <p className="text-lg font-bold mb-2">{text}</p>
      <span className="text-sm font-bold text-gray-600">{timestamp}</span>
    </div>
  );
};

export default PostCard;