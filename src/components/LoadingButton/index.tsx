import React from "react";
import styles from "./LoadingButton.module.css";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  children,
  ...props
}) => {
  return (
    <button className={styles.button} disabled={isLoading} {...props}>
      {isLoading ? <div className={styles.spinner}></div> : children}
    </button>
  );
};

export default LoadingButton;
