import React from "react";
import styles from "./Dashboard.module.css";
import { useAuth } from "../../hooks/useAuth";

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.welcomeTitle}>Welcome, {user?.email}!</h1>
      <p className={styles.welcomeSubtitle}>
        This is your personal dashboard. More features coming soon.
      </p>
    </div>
  );
};

export default DashboardPage;
