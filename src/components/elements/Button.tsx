import React from 'react';
import styles from './Element.module.scss';

interface ButtonProps {
  // type
  children: string;
  isDisabled: boolean;
  className: string;
  onClick: (e: React.FormEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  // type,
  children,
  className,
  isDisabled,
  onClick,
}) => {
  return (
    <button
      children={children}
      className={`${styles.button} ${styles[className]}`}
      disabled={isDisabled}
      onClick={onClick}
    />
  );
};

export default Button;
