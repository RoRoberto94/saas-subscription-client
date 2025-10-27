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
import { socket } from "../../lib/socket";

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

  const fetchSubscription = useCallback(async () => {
    try {
      const response = await apiClient.get("/billing/subscription");
      setSubscription(response.data);
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status !== 404) {
        console.error("Failed to fetch subscription:", error);
      } else {
        setSubscription(null);
      }
    }
  }, []);

  useEffect(() => {
    const handleSubscriptionChange = (data?: { status?: string }) => {
      // Re-fetch subscription data on real-time event from backend.
      console.log(
        "WebSocket event received: subscription_changed. Refetching data..."
      );

      if (data?.status === "canceled") {
        toast.error(
          "Your subscription will be canceled at the end of the period."
        );
      } else if (data?.status === "updated") {
        toast.success("Your subscription has been successfully updated!");
      } else if (data?.status === "deleted") {
        toast.error("Your subscription has been removed.");
      }

      fetchSubscription();
    };

    const initialLoad = async () => {
      setIsLoading(true);
      await fetchSubscription();
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

    socket.on("local_subscription_changed", handleSubscriptionChange);
    window.addEventListener("focus", fetchSubscription);

    return () => {
      socket.off("local_subscription_changed", handleSubscriptionChange);
      window.removeEventListener("focus", fetchSubscription);
    };
  }, [fetchSubscription, searchParams, setSearchParams]);

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
