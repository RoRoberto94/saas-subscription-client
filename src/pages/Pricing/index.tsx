import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Pricing.module.css";
import apiClient from "../../lib/axios";
import { useAuth } from "../../hooks/useAuth";
import { AxiosError } from "axios";

interface Plan {
  name: string;
  price: number;
  priceId: string;
  features: string[];
}

interface Subscription {
  stripePriceId: string;
}

const PricingPage: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [currentSubscription, setCurrentSubscription] =
    useState<Subscription | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const plansResponse = await apiClient.get("/billing/plans");
        setPlans(plansResponse.data);
      } catch (error) {
        console.error("CRITICAL: Failed to fetch plans.", error);
      }

      if (isAuthenticated) {
        try {
          const subscriptionResponse = await apiClient.get(
            "/billing/subscription"
          );
          setCurrentSubscription(subscriptionResponse.data);
        } catch (error) {
          if (error instanceof AxiosError && error.response?.status !== 404) {
            console.error("Failed to fetch subscription status:", error);
          }
          setCurrentSubscription(null);
        }
      }
    };

    fetchData();
  }, [isAuthenticated]);

  const handleSubscribe = async (priceId: string) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setProcessingId(priceId);
    try {
      const response = await apiClient.post<{ url: string }>(
        "/billing/create-checkout-session",
        { priceId, clientUrl: window.location.origin }
      );
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Failed to create checkout session:", error);
      setProcessingId(null);
    }
  };

  const handleManagePlan = async () => {
    setProcessingId("manage_portal");
    try {
      const response = await apiClient.post<{ url: string }>(
        "/billing/customer-portal",
        { clientUrl: window.location.origin }
      );
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Failed to create customer portal session:", error);
      setProcessingId(null);
    }
  };

  return (
    <div className={styles.pricingContainer}>
      {plans.map((plan) => {
        const isCurrentPlan =
          currentSubscription?.stripePriceId === plan.priceId;
        const currentPlanDetails = plans.find(
          (p) => p.priceId === currentSubscription?.stripePriceId
        );
        const isUpgrade = currentPlanDetails
          ? plan.price > currentPlanDetails.price
          : false;

        let buttonText = "Subscribe";
        let buttonAction = () => handleSubscribe(plan.priceId);
        let buttonStyle = styles.subscribeButton;
        let isProcessingThisButton = false;

        if (isAuthenticated && currentSubscription) {
          if (isCurrentPlan) {
            buttonText = "Your Plan";
          } else {
            isProcessingThisButton = processingId === "manage_portal";
            if (isUpgrade) {
              buttonText = isProcessingThisButton ? "Processing..." : "Upgrade";
              buttonAction = handleManagePlan;
              buttonStyle = `${styles.subscribeButton} ${styles.upgradeButton}`;
            } else {
              buttonText = isProcessingThisButton
                ? "Processing..."
                : "Downgrade";
              buttonAction = handleManagePlan;
              buttonStyle = `${styles.subscribeButton} ${styles.downgradeButton}`;
            }
          }
        } else {
          isProcessingThisButton = processingId === plan.priceId;
          buttonText = isProcessingThisButton ? "Processing..." : "Subscribe";
        }

        return (
          <div
            key={plan.priceId}
            className={`${styles.planCard} ${
              isCurrentPlan ? styles.currentPlan : ""
            }`}
          >
            {isCurrentPlan && (
              <div className={styles.currentPlanBadge}>Current Plan</div>
            )}
            <h2 className={styles.planName}>{plan.name}</h2>
            <p className={styles.planPrice}>
              €{plan.price}
              <span className={styles.pricePeriod}> / month</span>
            </p>
            <ul className={styles.featureList}>
              {plan.features.map((feature, index) => (
                <li key={index}>✓ {feature}</li>
              ))}
            </ul>
            <button
              onClick={buttonAction}
              className={buttonStyle}
              disabled={isCurrentPlan || processingId !== null}
            >
              {buttonText}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PricingPage;
