interface Props {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg";
  color?: "pink" | "yellow" | "cyan" | "black"; // Add color prop
}

const Button = ({ 
  text, 
  onClick, 
  disabled = false, 
  type = "button", 
  size = "md",
  color = "yellow" // Default to pink
}: Props) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-base",
    md: "px-6 py-3 text-lg",
    lg: "px-8 py-4 text-xl"
  };

  const colorClasses = {
    pink: "bg-[#FF10F0] text-white",
    yellow: "bg-[#FFE951] text-black",
    cyan: "bg-[#00F0FF] text-black",
    black: "bg-black text-[#FFE951]"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md ${colorClasses[color]} border-4 border-black ${sizeClasses[size]} font-black hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[8px] active:translate-y-[8px] transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
      style={{ boxShadow: '8px 8px 0px #000' }}
      onMouseEnter={(e) => !disabled && (e.currentTarget.style.boxShadow = '0px 0px 0px #000')}
      onMouseLeave={(e) => !disabled && (e.currentTarget.style.boxShadow = '4px 4px 0px #000')}
      onMouseDown={(e) => !disabled && (e.currentTarget.style.boxShadow = '0px 0px 0px #000')}
      // onMouseUp={(e) => !disabled && (e.currentTarget.style.boxShadow = '4px 4px 0px #000')}
    >
      {text}
    </button>
  );
};

export default Button