import React from 'react';
import './Button.css';

interface ButtonProps {
  label: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, className = 'button-28' }) => {
  return (
    <button className={className} role='button'>
      {label}
    </button>
  );
};

export default Button;
