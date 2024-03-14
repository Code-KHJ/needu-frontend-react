import React from 'react';
import styles from './Element.module.scss';

interface ButtonProps {
  // type
  children: string;
  style?: object
  isDisabled: boolean;
  className: string;
  onClick: (e: React.FormEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  // type,
  children,
  style,
  className,
  isDisabled,
  onClick,
}) => {
  return (
    <button
      type='button'
      children={children}
      style={style}
      className={`${styles.button} ${styles[className]}`}
      disabled={isDisabled}
      onClick={onClick}
    />
  );
};

export default Button;
