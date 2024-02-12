import React from 'react';

interface ButtonProps {
  title: string;
  isDisabled: boolean;
  onClick: (e: React.FormEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = () => {
  return <div>Button</div>;
};

export default Button;
