import React from "react";
import { Link } from "react-router-dom";
import styles from "./NoSubscription.module.css";

const NoSubscription: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>You don't have an active subscription.</h2>
      <Link to="/pricing" className={styles.button}>
        Choose a Plan
      </Link>
    </div>
  );
};

export default NoSubscription;
