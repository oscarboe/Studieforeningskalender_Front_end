import React from 'react';
import './Button.css';

interface ButtonProps {
  label: string;
  className?: string;
}

const Button = ({ label, className = 'button-28' }: ButtonProps) => {
  return (
    <button className={className} role="button">
      {label}
    </button>
  );
};

export default Button;
