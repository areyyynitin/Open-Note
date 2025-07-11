import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary" ;
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void
  fullWidth?: boolean
  loading?: boolean
}

const variantClasses = {
  primary: "bg-purple-600 text-white hover: ",
  secondary: "bg-blue-400 text-white",
  
};

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center"

export function Button({ variant, text, startIcon, onClick, fullWidth, loading }: ButtonProps) {
  return (
    <>

      <button onClick={onClick}
        className={
          `${variantClasses[variant]} ${defaultStyles}
          ${variant === "primary" ? "hover:bg-purple-700" : ""}
          ${variant === "secondary" ? "hover:bg-blue-500" : ""}
          ${fullWidth ? " w-full flex justify-center items-center" : ""}
          ${loading ? "opacity-45" : ""}`
        }

        disabled={loading}>
        <div className="pr-2">
          {startIcon}

        </div>
        {text}</button>

    </>
  );
}
