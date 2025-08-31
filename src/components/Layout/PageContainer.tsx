import React from "react";
import styles from "./PageContainer.module.css";

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return <main className={styles.container}>{children}</main>;
};

export default PageContainer;
