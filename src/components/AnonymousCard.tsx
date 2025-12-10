interface Props {
  text: string;
  timestamp: string;
  isAnonymous: boolean;
  senderUsername?: string; // Only present if not anonymous
}

const AnonymousCard = ({ text, timestamp, isAnonymous, senderUsername }: Props) => {
  return (
    <div 
      className="bg-white max-w-2xl mx-auto my-2 border-4 border-black p-6"
      style={{ boxShadow: '6px 6px 0px #000' }}
    >
      <div className="flex justify-between items-start mb-3">
        {isAnonymous ? (
          <span className="bg-black text-[#FFE951] px-3 py-1 font-black text-sm border-2 border-black">
            ANONYMOUS
          </span>
        ) : (
          <span className="bg-[#00F0FF] text-black px-3 py-1 font-black text-sm border-2 border-black">
            FROM: {senderUsername}
          </span>
        )}
        <span className="text-sm font-bold text-gray-600">{timestamp}</span>
      </div>
      <p className="text-lg font-bold">{text}</p>
    </div>
  );
};

export default AnonymousCard;