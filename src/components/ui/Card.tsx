interface Props {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = '' }: Props) => {
  return (
    <div 
      className={`bg-white border-4 border-black p-6 ${className}`}
      style={{ boxShadow: '6px 6px 0px #000' }}
    >
      {children}
    </div>
  );
};

export default Card;