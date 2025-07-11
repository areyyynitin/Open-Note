import { forwardRef } from "react";

interface InputProps {
  placeholder: string;
  type?: string;
  className?:string
}

// Use forwardRef to support ref forwarding
export const AuthInput = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, type = "text",className="" }, ref) => {
    return (
      <input
        ref={ref}
        type={type} 
        placeholder={placeholder}
        className={`border  px-4 py-2  w-64 rounded mt-2 outline-none border-slate-800 ${className}`}
      />
    );
  }
);
