import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { useAuth } from "../../hooks/useAuth";

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.heroTitle}>
        Manage Your Subscriptions Effortlessly
      </h1>
      <p className={styles.heroSubtitle}>
        Subscribe is the all-in-one solution to handle your recurring payments,
        track your plans, and stay in control of your finances.
      </p>
      <Link to="/pricing" className={styles.ctaButton}>
        View Plans
      </Link>
    </div>
  );
};
export default HomePage;
