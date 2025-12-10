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
    <label className="block">
      <span className="text-lg font-black mb-2 block">{label}</span>
      <input 
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className="mt-0.5 w-100 h-15 outline-0 border-2 py-2 px-2 border-black shadow-[4px_4px_0_0] rounded-md sm:text-md"
        // style={{ boxShadow: 'inset 4px 4px 0px rgba(0,0,0,0.2)' }}
      />
    </label>
  );
};

export default Input;