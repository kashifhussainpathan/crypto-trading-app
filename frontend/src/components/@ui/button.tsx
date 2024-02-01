import { ReactNode, SyntheticEvent } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  onClick: (event: SyntheticEvent) => void;
};

const Button = ({ children, onClick, className }: ButtonProps) => {
  const handleClick = (event: SyntheticEvent) => {
    event.preventDefault();
    onClick(event);
  };

  return (
    <button
      className={`w-[100%] rounded-md mx-auto mt-4 text-base py-2 bg-gray-800 text-white border-none font-base ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
