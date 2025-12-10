import Card from './ui/Card';

interface Props {
  text: string;
  timestamp: string;
  isAnonymous: boolean;
  senderUsername?: string;
}

const MessageCard = ({ text, timestamp, isAnonymous, senderUsername }: Props) => {
  return (
    <Card>
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
    </Card>
  );
};

export default MessageCard;