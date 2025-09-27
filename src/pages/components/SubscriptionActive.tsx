import React, { useState } from "react";
import styles from "./SubscriptionActive.module.css";
import apiClient from "../../lib/axios";

interface Subscription {
  planName: string;
  stripeCurrentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

interface SubscriptionActiveProps {
  subscription: Subscription;
}

const SubscriptionActive: React.FC<SubscriptionActiveProps> = ({
  subscription,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleManageSubscription = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.post<{ url: string }>(
        "/billing/customer-portal",
        { clientUrl: window.location.origin }
      );
      window.open(response.data.url, "_blank");
    } catch (error) {
      console.error("Failed to create customer portal session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Subscription</h2>
      <div className={styles.detail}>
        <span>Plan:</span>
        <strong>{subscription.planName}</strong>
      </div>
      <div className={styles.detail}>
        <span>
          {subscription.cancelAtPeriodEnd ? "Cancels on:" : "Renews on:"}
        </span>
        <strong>
          {new Date(subscription.stripeCurrentPeriodEnd).toLocaleDateString()}
        </strong>
      </div>
      {subscription.cancelAtPeriodEnd && (
        <p className={styles.cancelWarning}>
          Your plan will not renew. You will lose access after the cancellation
          date.
        </p>
      )}
      <button
        onClick={handleManageSubscription}
        className={styles.button}
        disabled={isLoading}
      >
        {isLoading ? "Redirecting..." : "Manage Subscription"}
      </button>
    </div>
  );
};

export default SubscriptionActive;
