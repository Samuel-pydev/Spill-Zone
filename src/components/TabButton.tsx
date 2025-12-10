interface Props {
  icon: React.ReactNode; // For the icon component
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton = ({ icon, label, isActive, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center flex-1 py-4 border-4 border-black transition-all ${
        isActive 
          ? 'bg-[#FFE951] translate-x-[4px] translate-y-[4px]' 
          : 'bg-white hover:translate-x-[2px] hover:translate-y-[2px]'
      }`}
      style={{
        boxShadow: isActive ? '4px 4px 0px #000' : '8px 8px 0px #000'
      }}
    >
      {icon}
      <span className="text-sm font-bold mt-1">{label}</span>
    </button>
  );
};

export default TabButton;