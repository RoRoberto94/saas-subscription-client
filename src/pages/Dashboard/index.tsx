import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import styles from "./Dashboard.module.css";
import { useAuth } from "../../hooks/useAuth";
import apiClient from "../../lib/axios";
import SubscriptionActive from "../components/SubscriptionActive";
import NoSubscription from "../components/NoSubscription";
import { AxiosError } from "axios";
import Spinner from "../../components/Spinner";

interface Subscription {
  id: string;
  planName: string;
  cancelAtPeriodEnd: boolean;
  stripeCurrentPeriodEnd: string;
}

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const checkDataAndNotifications = useCallback(async () => {
    const successMsg = localStorage.getItem("pending_notification_success");
    if (successMsg) {
      toast.success(successMsg, { duration: 5000 });
      localStorage.removeItem("pending_notification_success");
    }
    const errorMsg = localStorage.getItem("pending_notification_error");
    if (errorMsg) {
      toast.error(errorMsg, {
        duration: 5000,
        iconTheme: {
          primary: "var(--error-color)",
          secondary: "#FFFFFF",
        },
      });
      localStorage.removeItem("pending_notification_error");
    }

    try {
      const response = await apiClient.get("/billing/subscription");
      setSubscription(response.data);
    } catch (error) {
      if (!(error instanceof AxiosError && error.response?.status !== 404)) {
        console.error("Failed to fetch subscription:", error);
      }
      setSubscription(null);
    }
  }, []);

  useEffect(() => {
    const initialLoad = async () => {
      setIsLoading(true);
      await checkDataAndNotifications();
      setIsLoading(false);
    };

    const paymentSuccess = searchParams.get("payment_success");
    if (paymentSuccess) {
      toast.success("Payment successful! Your subscription is now active.", {
        duration: 5000,
      });
      searchParams.delete("payment_success");
      setSearchParams(searchParams, { replace: true });
    }

    initialLoad();

    window.addEventListener("focus", checkDataAndNotifications);
    return () => {
      window.removeEventListener("focus", checkDataAndNotifications);
    };
  }, [checkDataAndNotifications, searchParams, setSearchParams]);

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.welcomeTitle}>Welcome, {user?.email}!</h1>
      <p className={styles.welcomeSubtitle}>
        Manage your account and subscription here.
      </p>
      {isLoading ? (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "2rem" }}
        >
          <Spinner />
        </div>
      ) : subscription ? (
        <SubscriptionActive subscription={subscription} />
      ) : (
        <NoSubscription />
      )}
    </div>
  );
};

export default DashboardPage;
