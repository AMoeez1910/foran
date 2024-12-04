import React, { forwardRef } from "react";
import styles from "./styles.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  className?: string;
  type?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, value, onChange, className, type = "text", ...props }, ref) => {
    return (
      <input
        className={`${styles.input} ${className}`}
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange}
        ref={ref} 
        {...props}
      />
    );
  }
);

Input.displayName = "Input";  // Set display name for better debugging

export default Input;
