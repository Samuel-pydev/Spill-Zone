interface Props {
  label: string;
  type?: "text" | "email" | "password" | "number";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

const Input = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  disabled = false,
  required = false 
}: Props) => {
  return (
    <label className="block w-full">
      <span className="text-lg font-black mb-2 block">{label}</span>
      <input 
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className="w-full min-h-[3rem] outline-none border-4 border-black py-3 px-4 font-bold text-base sm:text-lg rounded-md shadow-[4px_4px_0_0_#000] focus:shadow-[2px_2px_0_0_#000] transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </label>
  );
};

export default Input;