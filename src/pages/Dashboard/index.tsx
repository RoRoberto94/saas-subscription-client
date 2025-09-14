import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { useAuth } from "../../hooks/useAuth";
import apiClient from "../../lib/axios";
import SubscriptionActive from "../components/SubscriptionActive";
import NoSubscription from "../components/NoSubscription";
import { AxiosError } from "axios";

interface Subscription {
  id: string;
  userId: string;
  stripeSubscriptionId: string;
  stripeCurrentPeriodEnd: string;
  planName: string;
}

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchSubscription = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get("/billing/subscription");
      setSubscription(response.data);
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status !== 404) {
        console.error("Failed to fetch subscription:", error);
      }
      setSubscription(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // On component mount, check for URL params from Stripe redirect to force a data refresh.
    const paymentSuccess = searchParams.get("payment_success");

    if (paymentSuccess) {
      console.log("Payment successful! Refreshing subscription data.");
      searchParams.delete("payment_success");
      setSearchParams(searchParams);
    }

    fetchSubscription();
  }, [fetchSubscription, searchParams, setSearchParams]);

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.welcomeTitle}>Welcome, {user?.email}!</h1>
      <p className={styles.welcomeSubtitle}>
        Manage your account and subscription here.
      </p>

      {isLoading ? (
        <p>Loading subscription details...</p>
      ) : subscription ? (
        <SubscriptionActive subscription={subscription} />
      ) : (
        <NoSubscription />
      )}
    </div>
  );
};

export default DashboardPage;
