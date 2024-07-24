import React from 'react';

type Props = {
  type?: 'submit' | 'reset' | 'button' | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // Optional click handler
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
};

const Button: React.FC<Props> = ({ type, onClick, disabled = false, variant = 'primary', children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-[11px] rounded-[8px] border border-solid font-[600] text-body-m duration-100 ${disabled && variant == "primary" ? 'bg-primary-default opacity-[25%] text-white cursor-not-allowed' : variant == "primary" ? 'bg-primary-default text-white hover:bg-primary-200 hover:shadow-custom-purple-light' : disabled && variant == "secondary" ? "bg-transparent text-primary-default border-primary-default opacity-[25%] cursor-not-allowed" : variant == "secondary" ? "bg-transparent text-primary-default border-primary-default hover:bg-primary-100" : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
